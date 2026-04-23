import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import GameInteractive from "./GameInteractive";
import * as THREE from "three";
import CrowdWoo from "./Sounds/CrowdWoo";
import { useGameCore } from "../Context/GameCoreContext";
import TomatoSound from "./Sounds/TomatoSound"
import StartGameSound from "./Sounds/StartGameSound";

const Crowd = ({
  updatePlayerScore,
  backGroundOpacity,
  onGameOver,
  gameOver,
  resetCounter,
  setResetCounter,
  playerScore,
  multiplier,
  setMultiplier,
  crowdPosition,
  showDeductedPoints,
  showAddPoints,
  addGestureHype,
  tShirtRefs,
}) => {
  const plane1Ref = useRef();
  const plane2Ref = useRef();
  const plane3Ref = useRef();
  const planeTriggerRef = useRef();
  const [diminishingReturns, setDiminishingReturns] = useState(0);
  const [DRpoint, setDRpoint] = useState(1000);
  const [decreaseAmount, setDecreaseAmount] = useState(0.001);
  const [isHovered, setIsHovered] = useState(false);
  const [counter, setCounter] = useState(6.4);
  const [ringColor, setRingColor] = useState();
  const [isInteractive, setIsInteractive] = useState(true);
  const [multiplierIncreased, setMultiplierIncreased] = useState(false);
  const [canThrowTomato, setCanThrowTomato] = useState(true);
  const [canIntersect, setCanIntersect] = useState(true);
  const playCrowdSound = CrowdWoo();
  const { throwTomato, deleteTomato } = useGameCore();
  const tomatoFrequency = 1;
  const playTomatoSplat = TomatoSound();
  const playHitCrowdSound = StartGameSound();
  const startCounterSpeed = 0.04;

  const theCrowd = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL}Textures/HypeHeaven_Crowd.png`,
  );

  const handleHoverStart = () => {
    if (isInteractive && !gameOver && backGroundOpacity === 0) {
      setIsHovered(true);
    }
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
  };

  const getRandomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Counter logic
  useEffect(() => {
    if (gameOver) {
      return; // Skip the counter update if the game is over
    }

    if (resetCounter) {
      setCounter(6.4);
      setDiminishingReturns(0);
      setIsInteractive(true);
      setResetCounter(false);
      setMultiplierIncreased(false);
      setDiminishingReturns(0);
      setDecreaseAmount(0.001);
      setDRpoint(1000);
    }

    let interval;

    if ((isHovered && isInteractive && backGroundOpacity === 0) || addGestureHype) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = prevCounter + 0.1 > 6.3 ? 6.3 : prevCounter + 0.1;
          updatePlayerScore(10 + 1 * multiplier); // Apply multiplier to the score
          if (newCounter === 6.3 && !multiplierIncreased && multiplier < 10) {
            setMultiplier((prevMultiplier) => prevMultiplier + 0.1);
            setMultiplierIncreased(true);
          } else if (newCounter < 6 && multiplierIncreased) {
            setMultiplierIncreased(false);
          }
          return newCounter;
        });
      }, 100);
    } else if (
      !isHovered && isInteractive && backGroundOpacity === 0 && !addGestureHype
    ) {
      interval = setInterval(() => {
        setCounter((prevCounter) => {
          const newCounter = Math.max(
            prevCounter - (startCounterSpeed + diminishingReturns),
            0,
          );
          if (newCounter < 5 && multiplier >= 1) {
            setMultiplier(multiplier - 1);
          }
          if (newCounter < 1.55) {
            setMultiplier(0);
          }
          if (newCounter === 0) {
            setIsInteractive(false);
            onGameOver();
          }
          return newCounter;
        });
      }, 100);
    } 

    if (playerScore > DRpoint) {
      setDiminishingReturns(diminishingReturns + decreaseAmount);
      setDRpoint((DRpoint + 1000) * 1.25);
      setDecreaseAmount(decreaseAmount + 0.001);
    }

    return () => clearInterval(interval);
  }, [
    isHovered,
    backGroundOpacity,
    isInteractive,
    setDRpoint,
    DRpoint,
    decreaseAmount,
    setDecreaseAmount,
    gameOver,
    resetCounter,
    diminishingReturns,
    setDiminishingReturns,
    playerScore,
    multiplier,
    multiplierIncreased,
    addGestureHype,
  ]);

  useEffect(() => {
    if (counter < 5) {
      tryThrowTomato()
    } 
  }, [counter])

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

      if (plane1Ref.current) {
        plane1Ref.current.position.y = 0 + Math.sin(elapsedTime * 19) * 0.03; // Animate the position
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
  });

  const combinedHoverHandler = () => {
    if (isInteractive && backGroundOpacity === 0 && !gameOver) {
      handleHoverStart();
    }

    if (!gameOver && backGroundOpacity === 0) {
      playCrowdSound();
    }
  };

  const tryThrowTomato = () => {
    if (!gameOver && canThrowTomato) {
      let max = counter * 100;
      let randomNum = getRandomInteger(0, max);
      if (randomNum <= tomatoFrequency && counter > 0.1 && counter < 5) {
        const crowdX = crowdPosition[0];
        const crowdY = crowdPosition[1];
        const crowdZ = crowdPosition[2];
        throwTomato(crowdX, crowdY, crowdZ, handleGroundHit, handlePlayerHit);

        //delay before next tomato can be thrown
        setCanThrowTomato(false);
        setTimeout(() => {
          setCanThrowTomato(true); 
        }, 1000);
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

      <GameInteractive onHover={combinedHoverHandler} onBlur={handleHoverEnd}>
        <mesh ref={plane1Ref}>
          <planeGeometry args={[3, 2]} transparent={true} opacity={0} />
          <meshBasicMaterial 
          transparent={true} 
          opacity={1} 
          map={theCrowd} 
          side={THREE.DoubleSide}
          />
        </mesh>
      </GameInteractive>

      <mesh position={[0, 1.5, 0.001]}>
        <torusGeometry args={[0.3, 0.1, 30, 100, counter]} />
        <meshBasicMaterial color={ringColor} />
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
          opacity={1}
          map={theCrowd}
          side={THREE.DoubleSide}
        />
      </mesh>

      <mesh ref={plane3Ref} position={[0, 0.6, -0.32]}>
        <planeGeometry args={[3, 2]} />
        <meshBasicMaterial
          color="#888"
          transparent={true}
          opacity={1}
          map={theCrowd}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Crowd;
