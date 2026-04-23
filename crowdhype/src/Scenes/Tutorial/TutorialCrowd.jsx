import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Interactive } from "@react-three/xr";
import * as THREE from "three";
import CrowdWoo from "../../Components/Sounds/CrowdWoo";
import { useGameCore } from "../../Context/GameCoreContext";
import TomatoSound from "../../Components/Sounds/TomatoSound"
import StartGameSound from "../../Components/Sounds/StartGameSound";

const TutorialCrowd = ({
  opacity = 1,
  updatePlayerScore = () => {},
  crowdPosition = [0, 0, 0],
  showDeductedPoints = () => {},
  showAddPoints = () => {},
  addGestureHype = false,
  tShirtRefs = [],
  hypeCounter = 6.4,
  doTomatoes = false,
  doHypeCounters = false,
  canHover = false,
  onGameOver = () => {},
}) => {
  const plane1Ref = useRef();
  const plane2Ref = useRef();
  const plane3Ref = useRef();
  const planeTriggerRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [counter, setCounter] = useState(hypeCounter);
  const [ringColor, setRingColor] = useState();
  const [canThrowTomato, setCanThrowTomato] = useState(false);
  const [canIntersect, setCanIntersect] = useState(true);
  const playCrowdSound = CrowdWoo();
  const { throwTomato, deleteTomato } = useGameCore();
  const tomatoFrequency = 1.5;
  const playTomatoSplat = TomatoSound();
  const playHitCrowdSound = StartGameSound();
  const firstTomatoDelay = 2000;
  const tomatoSpawnTimeout = 5000;

  const theCrowd = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL}Textures/HypeHeaven_Crowd.png`,
  );

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  useEffect(() => {
    setTimeout(() => {
      setCanThrowTomato(true);
    }, firstTomatoDelay)
  })

  useEffect(() => {
    if (counter === 0){
      onGameOver();
    }
  }, [counter])

  // Counter logic
  useEffect(() => {
    let interval;
    if (!doHypeCounters) {
      if (addGestureHype) {
        interval = setInterval(() => {
          setCounter((prevCounter) => {
            const newCounter = prevCounter + 0.1 > 6.3 ? 6.3 : prevCounter + 0.1;
            return newCounter;
          });
        }, 100);
      }
      
      return; // Skip the counter update if the game is over
    }

    if (isHovered|| addGestureHype) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 0.1 > 6.3 ? 6.3 : prevCounter + 0.1;
          updatePlayerScore(1);
          return newCounter;
        });
      }, 100);
    } else if (!isHovered && !addGestureHype) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = Math.max(
            prevCounter - (0.03),
            0,
          );
          return newCounter;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [isHovered, addGestureHype, ]);

  useFrame((state) => {
    if (plane1Ref.current) {
      if (isHovered || addGestureHype) {
        plane1Ref.current.material.color.set("red");
      } else {
        plane1Ref.current.material.color.set("#d4d4d4");
      }
    }

    if (counter > 5.5) {
      setRingColor("#0af50a");
    } else if (counter > 1.55 && counter < 5.5) {
      setRingColor("#ffff05");
    } else {
      setRingColor("#e20909");
    }

    // Animate planes
    if (isHovered || addGestureHype) {
      const elapsedTime = state.clock.getElapsedTime();

      // Animate the position
      if (plane1Ref.current) {
        plane1Ref.current.position.y = 0 + Math.sin(elapsedTime * 19) * 0.03; 
      }

      if (plane2Ref.current) {
        plane2Ref.current.position.y = 0.3 + Math.sin(elapsedTime * 15) * 0.03;
      }

      if (plane3Ref.current) {
        plane3Ref.current.position.y = 0.6 + Math.sin(elapsedTime * 12) * 0.02;
      }
    }

    //check for t-shirt hitting crowd
    if (planeTriggerRef.current && tShirtRefs.current) {
      const planeBox = new THREE.Box3().setFromObject(planeTriggerRef.current);
      tShirtRefs.current.forEach((tShirtRef, index) => {
        if (tShirtRef) {
          const tShirtBox = new THREE.Box3().setFromObject(tShirtRef);
          if (tShirtBox.intersectsBox(planeBox) && canIntersect) {
            setCanIntersect(false)
            hitCrowd(index)
            setTimeout(() => {
              setCanIntersect(true);
            }, 2000);//delay before next t-shirt can trigger 
          }
        }
      });
    }

    if (counter < 5 && doTomatoes) {
      tryThrowTomato()
    } 
  });

  const combinedHoverHandler = () => {
    if (canHover) {
      handleHoverStart();
      playCrowdSound();
    }
  };

  const tryThrowTomato = () => {
    if (canThrowTomato && doTomatoes) {
      let max = (counter + 1) * 300;
      let randomNum = getRandomInteger(0, max);
      if (randomNum <= tomatoFrequency && counter < 5) {
        const crowdX = crowdPosition[0];
        const crowdY = crowdPosition[1];
        const crowdZ = crowdPosition[2];
        throwTomato(crowdX, crowdY, crowdZ, handleGroundHit, handlePlayerHit);

        //delay before next tomato can be thrown
        setCanThrowTomato(false);
        setTimeout(() => {
          setCanThrowTomato(true); 
        }, tomatoSpawnTimeout);
      }
    }
  }

  //removes points and time on counter when hit by tomato
  const handlePlayerHit = (tomatoId) => {
    deleteTomato(tomatoId);
    playTomatoSplat()
    updatePlayerScore(-500); 
    setCounter((prev) => Math.max(prev - prev * 0.25, 0));  
    showDeductedPoints();
  }

  //adds points and time on counter when t-shirt hits crowd
  const hitCrowd = () => {
    playHitCrowdSound();
    updatePlayerScore(500)
    setCounter((prev) => Math.min(prev + 1.6, 6.5));
    showAddPoints();
  }

  const handleGroundHit = (tomatoId) => {
    deleteTomato(tomatoId);
  }

  
  const handleHoverStart = () => {
    setIsHovered(true);
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };


  return (
    <>
      {/*plane for detecting t-shirts */}
      <mesh 
        position={[0, -0.2, 0.5]} 
        ref={planeTriggerRef}
        rotation={[-0.2, 0, 0]}
      >
        <planeGeometry args={[3, 5]} transparent={true} opacity={0}/>
        <meshBasicMaterial 
          transparent={true} 
          opacity={0} 
          side={THREE.DoubleSide}
          />
      </mesh>

      <Interactive onHover={combinedHoverHandler} onBlur={handleHoverEnd}>
        <mesh ref={plane1Ref}>
          <planeGeometry args={[3, 2]} transparent={true} opacity={0} />
          <meshBasicMaterial 
          transparent={true} 
          opacity={opacity} 
          map={theCrowd} 
          side={THREE.DoubleSide}
          />
        </mesh>
      </Interactive>

      <mesh position={[0, 1.5, 0.001]}>
        <torusGeometry args={[0.3, 0.1, 30, 100, counter]} />
        <meshBasicMaterial 
          color={ringColor} 
        />
      </mesh>

      <mesh
        ref={plane2Ref}
        position={[0, 0.3, -0.16]}
        rotation={[0, -Math.PI / 1, 0]}
      >
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial
          color="#aeaeae"
          transparent={true}
          opacity={opacity}
          map={theCrowd}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={plane3Ref} position={[0, 0.6, -0.32]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial
          color="#888"
          transparent={true}
          opacity={opacity}
          map={theCrowd}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default TutorialCrowd;
