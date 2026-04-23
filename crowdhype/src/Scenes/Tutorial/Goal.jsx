import { useState } from "react";
import { Text } from "@react-three/drei";
import TutorialCrowd from "./TutorialCrowd";

const Goal = ({opacity}) => {
  const [playerScore, setPlayerScore] = useState(0);

  const fontSize = 0.15;
  const ZLocation = -2.7;

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
        GOAL: KEEP ALL CROWDS HYPED.
      </Text>
      <Text
        position={[0, 2.6, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        HYPE IS REPRESENTED BY TIMERS FOR EACH CROWD.
      </Text>
      <Text
        position={[0, 2.4, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        POINT TO A CROWD TO GET HYPE AND POINTS.
      </Text>

      <Text position={[-6, 2.5, -6]} rotation={[0, 0.5, 0]} fontSize={0.4}>
        {playerScore}
      </Text>
      
      <mesh position={[-3.5, 0, -5]} rotation={[0, Math.PI / 8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={5}
          doHypeCounters={true}
          canHover={true}
        />
      </mesh>
      <mesh position={[0, 0, -6]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={6.4}
          doHypeCounters={true}
          canHover={true}
        />
      </mesh>
      <mesh position={[3.5, 0, -5]} rotation={[0, Math.PI / -8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={2}
          doHypeCounters={true}
          canHover={true}
        />
      </mesh>
    </>
  )
}

export default Goal;