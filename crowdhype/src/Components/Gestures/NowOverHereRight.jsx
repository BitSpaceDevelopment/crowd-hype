import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import GameInteractive from "../GameInteractive";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CrowdWoo from "../Sounds/CrowdWoo";
import { getPath, calculateAccuracy, setPathAndPosition } from "../GesturePaths";
import GestureScore from "../GestureScore";
import StartGameSound from "../Sounds/StartGameSound";

const NowOverHereRight = ({
  setAddHype3, 
  updatePlayScore,
  gestureOpacity,
}) => {
  const [beenHovered, setBeenHovered] = useState(false);
  const [endHovered, setEndHovered] = useState(false);
  const [followPath, setFollowPath] = useState(false);
  const currentController = useRef(null);
  const [userPath, setUserPath] = useState([]);
  const [actualPath, setActualPath] = useState([]);
  const [holdBonus, setHoldBonus] = useState(false);
  const timeout = useRef(null);
  
  const multiplierTimer = 2000;
  const bonusTimer = 2000;
  const fontSize = 0.24;
  const numPointsActualPath = 50;
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
  const [accuracy, setAccuracy] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [score, setScore] = useState(0);
  const [canAddScore, setCanAddScore] = useState(true);

  //path
  const pathRadius = 1.7;
  const pathArc = 3;
  const pathPosition = new THREE.Vector3(1.7, 1.5, zPosition);
  const pathRotation = new THREE.Euler(0, Math.PI, 0);

  const conePosition = new THREE.Vector3(3.38, 1.7, zPosition);
  const coneRotation = new THREE.Euler(Math.PI, 0, -0.2);

  const endPosition = new THREE.Vector3(3.42, 1.4, zPosition);

  const textPosition = new THREE.Vector3(3.2, 3.2, zPosition);
  const textRotation = new THREE.Euler(0, 0, -0.5);

  useEffect(() => {
    setActualPath(getPath(
      pathRadius, pathArc, numPointsActualPath, pathPosition, pathRotation
    ));
  }, []);

  useEffect(() => {
    if(scoreOpacity > gestureOpacity) {
      setScoreOpacity(gestureOpacity);
    }
  }, [gestureOpacity]);

  useFrame(() => {
    //tracks players path
    if(followPath && currentController.current) {
      setPathAndPosition(
        currentController, 
        setUserPath, 
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

    if (holdBonus){
      setAddHype3(true);
    }

    if (holdBonus && canAddScore && endHovered) {
      setCanAddScore(false);
      updatePlayScore(score);
      setAddHype3(true);
      gestureSound();

      setTimeout(() => {
        setMultiplier((prev) => prev + 1);
        setCanAddScore(true);
      }, multiplierTimer);
    }
  });

  //color animation
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const hue = (elapsedTime / colorCycleDuration) * 360 % 360; 
    const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
    setAnimationColor(color);
  });

  const handleHoverLine = (e) => {
    const controller = e.target;
    currentController.current = controller;
    setFollowPath(true);
    setBeenHovered(true);
    setAddHype3(true);
    setShowScore(false)
    setAccuracy(0);
    setMultiplier(1);
    setScore(0);
    playCrowdSound();
  }

  const handleBlurLine = () => {
    setAddHype3(false);
  }

  const handleHoverEnd = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    calculateAccuracy(userPath, actualPath, setAccuracy, setScore);
    setFollowPath(false);
    setBeenHovered(true);
    setAddHype3(true);
    setShowScore(true);
    setHoldBonus(true);
    setEndHovered(true);
  }

  const handleBlurEnd = () => {
    setUserPath([]);
    currentController.current = null;
    setBeenHovered(false);
    timeout.current = setTimeout(() => {
      setAddHype3(false);
      setHoldBonus(false);
    }, bonusTimer);
    setEndHovered(false);
  }

  return(
    <>
      <GameInteractive onHover={(e) => {handleHoverLine(e)}} onBlur={handleBlurLine}>
        <mesh position={pathPosition} rotation={pathRotation}>
          <torusGeometry args={[pathRadius, 0.13, 30, 30, pathArc]} />
          <meshBasicMaterial
            color={beenHovered ? hoverColor : "#fff"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={gestureOpacity}
          />
        </mesh>
        <mesh position={conePosition} rotation={coneRotation}>
          <coneGeometry args={[0.3, 0.5, 20]}/>
          <meshBasicMaterial
            color={beenHovered ? hoverColor : "#fff"}
            side={THREE.DoubleSide}
            transparent={true}
            opacity={gestureOpacity}
          />
        </mesh>
      </GameInteractive>

      <GameInteractive onHover={handleHoverEnd} onBlur={handleBlurEnd}>
        <mesh position={endPosition}>
          <sphereGeometry args={[0.24]}/>
          <meshBasicMaterial
            color={holdBonus ? animationColor : "#fff"}
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
        Now Over Here!
      </Text>

      <GestureScore 
        scoreOpacity={scoreOpacity}
        accuracy={accuracy}
        score={score}
        multiplier={multiplier}
      />
    </>
  )
}

export default NowOverHereRight;