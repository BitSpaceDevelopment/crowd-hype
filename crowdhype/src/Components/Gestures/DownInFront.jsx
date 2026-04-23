import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import GameInteractive from "../GameInteractive";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CrowdWoo from "../Sounds/CrowdWoo";
import { getPath, calculateAccuracy, setPathAndPosition } from "../GesturePaths";
import GestureScore from "../GestureScore";
import StartGameSound from "../Sounds/StartGameSound";

const DownInFront = ({
  setAddHype2, 
  updatePlayScore,
  gestureOpacity,
}) => {
  const [beenHovered1, setBeenHovered1] = useState(false);
  const [beenHovered2, setBeenHovered2] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [endHovered1, setEndHovered1] = useState(false);
  const [endHovered2, setEndHovered2] = useState(false);
  const [followPath1, setFollowPath1] = useState(false);
  const [followPath2, setFollowPath2] = useState(false);
  const [userPath1, setUserPath1] = useState([]);
  const [userPath2, setUserPath2] = useState([]);
  const [actualPath1, setActualPath1] = useState([]);
  const [actualPath2, setActualPath2] = useState([]);
  const [holdBonus1, setHoldBonus1] = useState(false);
  const [holdBonus2, setHoldBonus2] = useState(false);
  const currentController1 = useRef(null);
  const currentController2 = useRef(null);
  const timeout1 = useRef(null);
  const timeout2 = useRef(null);

  const multiplierTimer = 2000;
  const bonusTimer = 2000;
  const fontSize = 0.24;
  const numPointsActualPath = 25;
  const distanceUserPath = 0.1;
  const zPosition = -4.5;
  const hoverColor = "#0c6de1";

  const playCrowdSound = CrowdWoo();
  const gestureSound = StartGameSound();

  //animations
  const [animationColor, setAnimationColor] = useState("hsl(0, 100%, 50%)");
  const colorCycleDuration = 3;
  const animationSpeed = 0.05;

  const [showScore, setShowScore] = useState(false);
  const [scoreOpacity, setScoreOpacity] = useState(0);

  //scores
  const [accuracy1, setAccuracy1] = useState(0);
  const [accuracy2, setAccuracy2] = useState(0);
  const [accuracyAverage, setAccuracyAverage] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [scoreAverage, setScoreAverage] = useState(0);
  const [canAddScore, setCanAddScore] = useState(true);

  //paths
  const pathRadius = 1.7;
  const pathArc = Math.PI / 2;
  const pathPosition1 = new THREE.Vector3(-2.3, 1.2, zPosition);
  const pathRotation1 = new THREE.Euler(0, 0, 0);
  const pathPosition2 = new THREE.Vector3(2.3, 1.2, zPosition);
  const pathRotation2 = new THREE.Euler(0, Math.PI, 0);

  const conePosition1 = new THREE.Vector3(-0.6, 1.1, zPosition);
  const coneRotation1 = new THREE.Euler(Math.PI, 0, 0);
  const conePosition2 = new THREE.Vector3(0.6, 1.1, zPosition);
  const coneRotation2 = new THREE.Euler(Math.PI, 0, 0);

  const endPosition1 = new THREE.Vector3(-0.6, 0.8, zPosition);
  const endPosition2 = new THREE.Vector3(0.6, 0.8, zPosition);

  const textPosition = new THREE.Vector3(2, 2, zPosition);
  const textRotation = new THREE.Euler(0, 0, 0.5);

  useEffect(() => {
    setActualPath1(getPath(
      pathRadius, pathArc, numPointsActualPath, pathPosition1, pathRotation1
    ));

    setActualPath2(getPath(
      pathRadius, pathArc, numPointsActualPath, pathPosition2, pathRotation2
    ));
  }, []);

  useEffect(() => {
    if(scoreOpacity > gestureOpacity) {
      setScoreOpacity(gestureOpacity);
    }
  }, [gestureOpacity]);

  useEffect(() => {
    if (!isHovered1 && !isHovered2 && !holdBonus1 && !holdBonus2) {
      setAddHype2(false)
    }
  }, [isHovered1, isHovered2, holdBonus1, holdBonus2])

  useFrame(() => {
    //tracks players path
    if(followPath1 && currentController1.current) {
      setPathAndPosition(
        currentController1, 
        setUserPath1, 
        distanceUserPath
      )
    }

    if(followPath2 && currentController2.current) {
      setPathAndPosition(
        currentController2, 
        setUserPath2,  
        distanceUserPath
      )
    }

    //fade in and out for score
    setScoreOpacity(
      showScore ? Math.min(
        scoreOpacity + animationSpeed, 1
      ) : Math.max(
        scoreOpacity - animationSpeed, 0
      )
    );

    if(holdBonus1 || holdBonus2 || endHovered1 || endHovered2) {
      setAccuracyAverage(Math.floor((accuracy1 + accuracy2) / 2))
      setScoreAverage(Math.floor((score1 + score2) / 20) * 10);
      if (!showScore){
        setShowScore(true);
      }

      if (canAddScore && endHovered1 && endHovered2) {
        setCanAddScore(false);
        updatePlayScore(score1);
        setAddHype2(true);
        gestureSound();
  
        setTimeout(() => {
          setMultiplier((prev) => prev + 1);
          setCanAddScore(true);
        }, multiplierTimer);
      }
    }
  });

  //color animation
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const hue = (elapsedTime / colorCycleDuration) * 360 % 360; 
    const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
    setAnimationColor(color);
  });

  const handleHoverLine1 = (e) => {
    const controller = e.target;;
    if (controller.inputSource?.handedness === "left") {
      currentController1.current = controller;
      setFollowPath1(true);
      setBeenHovered1(true);
      setAddHype2(true);
      setShowScore(false)
      setAccuracy1(0);
      setMultiplier(1);
      setScore1(0);
      playCrowdSound();
      setIsHovered1(true);
    }
  }

  const handleBlurLine1 = (e) => {
    const controller = e.target;;
    if (controller.inputSource?.handedness === "left") {
      setIsHovered1(false)
    }
  }

  const handleHoverLine2 = (e) => {
    const controller = e.target;
    if (controller.inputSource?.handedness === "right") {
      currentController2.current = controller;
      setFollowPath2(true);
      setBeenHovered2(true);
      setAddHype2(true);
      setShowScore(false)
      setAccuracy2(0);
      setMultiplier(1);
      setScore2(0);
      playCrowdSound();
      setIsHovered2(true);
    }
  }

  const handleBlurLine2 = (e) => {
    const controller = e.target;;
    if (controller.inputSource?.handedness === "right") {
      setIsHovered2(false);
    }
  }

  const handleHoverEnd1 = (e) => {
    const controller = e.target;;
    if (controller.inputSource?.handedness === "left") {
      if (timeout1.current) {
        clearTimeout(timeout1.current);
        timeout1.current = null;
      }
      calculateAccuracy(userPath1, actualPath1, setAccuracy1, setScore1);
      setFollowPath1(false);
      setBeenHovered1(true);
      setAddHype2(true);
      setHoldBonus1(true);
      setIsHovered1(true);
      setEndHovered1(true);
    }
  }

  const handleBlurEnd1 = (e) => {
    const controller = e.target;;
    if (controller.inputSource?.handedness === "left") {
      setUserPath1([]);
      currentController1.current = null;
      setBeenHovered1(false);
      timeout1.current = setTimeout(() => {
        setHoldBonus1(false);
      }, bonusTimer);
      setIsHovered1(false);
      setEndHovered1(false);
    }
  }

  const handleHoverEnd2 = (e) => {
    const controller = e.target;;
    if (controller.inputSource?.handedness === "right") { 
      if (timeout2.current) {
        clearTimeout(timeout2.current);
        timeout2.current = null;
      }
      calculateAccuracy(userPath2, actualPath2, setAccuracy2, setScore2);
      setFollowPath2(false);
      setBeenHovered2(true);
      setAddHype2(true);
      setHoldBonus2(true);
      setIsHovered2(true);
      setEndHovered2(true);
    }
  }

  const handleBlurEnd2 = (e) => {
    const controller = e.target;;
    if (controller.inputSource?.handedness === "right") { 
      setUserPath2([]);
      currentController2.current = null;
      setBeenHovered2(false);
      timeout2.current = setTimeout(() => {
        setHoldBonus2(false);
      }, bonusTimer);
      setIsHovered2(false);
      setEndHovered2(false);
    }
  }

  return(
    <>
      <GameInteractive 
        onHover={(e) => {handleHoverLine1(e)}} 
        onBlur={(e) => {handleBlurLine1(e)}}
      >
        <mesh position={pathPosition1} rotation={pathRotation1}>
          <torusGeometry args={[pathRadius, 0.13, 30, 30, pathArc]} />
          <meshBasicMaterial
            color={beenHovered1 ? hoverColor : "#fff"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={gestureOpacity}
          />
        </mesh>
        <mesh position={conePosition1} rotation={coneRotation1}>
          <coneGeometry args={[0.3, 0.5, 20]}/>
          <meshBasicMaterial
            color={beenHovered1 ? hoverColor : "#fff"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={gestureOpacity}
          />
        </mesh>
      </GameInteractive>

      <GameInteractive 
        onHover={(e) => {handleHoverLine2(e)}} 
        onBlur={(e) => {handleBlurLine2(e)}}
      >
        <mesh position={pathPosition2} rotation={pathRotation2}>
          <torusGeometry args={[pathRadius, 0.13, 30, 30, pathArc]} />
          <meshBasicMaterial
            color={beenHovered2 ? hoverColor : "#fff"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={gestureOpacity}
          />
        </mesh>
        <mesh position={conePosition2} rotation={coneRotation2}>
          <coneGeometry args={[0.3, 0.5, 20]}/>
          <meshBasicMaterial
            color={beenHovered2 ? hoverColor : "#fff"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={gestureOpacity}
          />
        </mesh>
      </GameInteractive>

      <GameInteractive 
        onHover={(e) => {handleHoverEnd1(e)}} 
        onBlur={(e) => {handleBlurEnd1(e)}}
      >
        <mesh position={endPosition1}>
          <sphereGeometry args={[0.24]}/>
          <meshBasicMaterial
            color={holdBonus1 ? animationColor : "#fff"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={gestureOpacity}
          />
        </mesh>
      </GameInteractive>

      <GameInteractive 
        onHover={(e) => {handleHoverEnd2(e)}} 
        onBlur={(e) => {handleBlurEnd2(e)}}
      >
        <mesh position={endPosition2}>
          <sphereGeometry args={[0.24]}/>
          <meshBasicMaterial
            color={holdBonus2 ? animationColor : "#fff"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={gestureOpacity}
          />
        </mesh>
      </GameInteractive>

      <Text
        position={textPosition} 
        rotation={textRotation} 
        fontSize={fontSize}
        color={"#fff"}
        transparent={true}
        fillOpacity={gestureOpacity}
      >
        Down In Front!
      </Text>

      <GestureScore 
        scoreOpacity={scoreOpacity}
        accuracy={accuracyAverage}
        score={scoreAverage}
        multiplier={multiplier}
      />
    </>
  )
}

export default DownInFront;