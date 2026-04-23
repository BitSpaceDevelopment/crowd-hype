import { Text } from "@react-three/drei";
import TutorialCrowd from "./TutorialCrowd";
import { useState } from "react";
import GameOverSound from "../../Components/Sounds/GameOverSound";

const GameOverTutorial = ({opacity}) => {
  const [playerScore, setPlayerScore] = useState(0);
  const playOverSound = GameOverSound();
  const fontSize = 0.15;
  const ZLocation = -2.7;

  const updatePlayerScore = (value) => {
    setPlayerScore((prevTotal) => Math.max(prevTotal + value, 0));
  };

  const onGameOver = () => {
    playOverSound();
  }

  return (
    <>
      <Text
        position={[0, 2.8, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        IF ANY HYPE COUNTER HITS 0, GAME OVER!
      </Text>

      <Text position={[-6, 2.5, -6]} rotation={[0, 0.5, 0]} fontSize={0.4}>
        {playerScore}
      </Text>
      
      <mesh position={[-3.5, 0, -5]} rotation={[0, Math.PI / 8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={1}
          doHypeCounters={true}
          canHover={false}
          onGameOver={onGameOver}
        />
      </mesh>
      <mesh position={[0, 0, -6]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={3}
          doHypeCounters={true}
          canHover={false}
          onGameOver={onGameOver}
        />
      </mesh>
      <mesh position={[3.5, 0, -5]} rotation={[0, Math.PI / -8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={2}
          doHypeCounters={true}
          canHover={false}
          onGameOver={onGameOver}
        />
      </mesh>
    </>
  )
}

export default GameOverTutorial;