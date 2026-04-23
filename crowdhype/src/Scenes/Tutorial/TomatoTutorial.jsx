import { Text } from "@react-three/drei";
import TutorialCrowd from "./TutorialCrowd";
import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import Tomato from "../../Components/Tomato";
import { useGameCore } from "../../Context/GameCoreContext";

const TomatoTutorial = ({opacity}) => {
  const [playerScore, setPlayerScore] = useState(10000);
  const [deductedPointsOpacity, setDeductedPointsOpacity] = useState(0);
  const [deductedPoints, setDeductedPoints] = useState(false);
  const { tomatoes } = useGameCore();
  const ZLocation = -2.7;
  const fontSize = 0.15;

  useFrame(() => {
    //animation for deducted points
    if (deductedPoints) {
      if (deductedPointsOpacity > 0) {
        setDeductedPointsOpacity((prev) => Math.max(prev - 0.01, 0)
        )
      } else {
        setDeductedPoints(false);
        setDeductedPointsOpacity(0);
      }
    }
  });

  const showDeductedPoints = () => {
    setDeductedPointsOpacity(1);
    setDeductedPoints(true);
  }

  const updatePlayerScore = (value) => {
    setPlayerScore((prevTotal) => Math.max(prevTotal + value, 0));
  };

  return (
    <>
      <Text
        position={[0, 2.8, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        POOR PERFORMANCE MEANS TOMATOES GET THROWN.
      </Text>
      <Text
        position={[0, 2.6, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        LOWER HYPE COUNTERS MEANS MORE TOMATOES.
      </Text>
      <Text
        position={[0, 2.4, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        DODGE TOMATOES TO AVOID LOOSING POINTS AND HYPE.
      </Text>

      <Text position={[-6, 2.5, -6]} rotation={[0, 0.5, 0]} fontSize={0.4}>
        {playerScore}
      </Text>
      <Text
        position={[-6, 2.1, -6]} 
        rotation={[0, 0.5, 0.1]} 
        fontSize={0.35}
        color={"red"}
        transparent={true}
        fillOpacity={deductedPointsOpacity}
      >
        -500!
      </Text>

      {tomatoes.map((tomato) => (
        <Tomato
          key={tomato.key}
          tomatoId={tomato.tomatoId}
          targetX={tomato.targetX}
          targetY={tomato.targetY}
          targetZ={tomato.targetZ}
          startX={tomato.startX}
          startY={tomato.startY}
          startZ={tomato.startZ}
          hitGround={tomato.hitGround}
          hitPlayer={tomato.hitPlayer}
          playerPosition={tomato.playerPosition}
        />
      ))}

      <mesh position={[-3.5, 0, -5]} rotation={[0, Math.PI / 8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          crowdPosition={[-3.5, 0, -5]}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={2}
          doTomatoes={true}
          showDeductedPoints={showDeductedPoints}
        />
      </mesh>
      <mesh position={[0, 0, -6]}>
        <TutorialCrowd
          opacity={opacity}
          crowdPosition={[0, 0, -6]}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={3}
          doTomatoes={true}
          showDeductedPoints={showDeductedPoints}
        />
      </mesh>
      <mesh position={[3.5, 0, -5]} rotation={[0, Math.PI / -8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          crowdPosition={[3.5, 0, -5]}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={1}
          doTomatoes={true}
          showDeductedPoints={showDeductedPoints}
        />
      </mesh>
    </>
  )
}

export default TomatoTutorial;