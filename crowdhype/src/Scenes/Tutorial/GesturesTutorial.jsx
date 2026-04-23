import { Text } from "@react-three/drei";
import TutorialCrowd from "./TutorialCrowd";
import { useState } from "react";
import Gestures from "../../Components/Gestures";

const GesturesTutorial = ({opacity}) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [addHype1, setAddHype1] = useState(false);
  const [addHype2, setAddHype2] = useState(false);
  const [addHype3, setAddHype3] = useState(false);
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
        TRACE GESTURE PATHS AND HOLD FOR BONUS POINTS.
      </Text>
      <Text
        position={[0, 2.6, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        MORE ACCURACY MEANS MORE POINTS.
      </Text>
      <Text
        position={[0, 2.4, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        LONGER HOLD MEANS HIGHER MULTIPLIER.
      </Text>

      <Text position={[-6, 2.5, -6]} rotation={[0, 0.5, 0]} fontSize={0.4}>
        {playerScore}
      </Text>

      <Gestures 
        setAddHype1={setAddHype1}
        setAddHype2={setAddHype2}
        setAddHype3={setAddHype3}
        gameOver={false}
        updatePlayScore={updatePlayerScore}  
        startDelayMin={2000}
        startDelayMax={3000}
        betweenDelayMin={4000}
        betweenDelayMax={5000}
      />

      <mesh position={[-3.5, 0, -5]} rotation={[0, Math.PI / 8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          crowdPosition={[-3.5, 0, -5]}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={4}
          addGestureHype={addHype1}
        />
      </mesh>
      <mesh position={[0, 0, -6]}>
        <TutorialCrowd
          opacity={opacity}
          crowdPosition={[0, 0, -6]}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={3}
          addGestureHype={addHype2}
        />
      </mesh>
      <mesh position={[3.5, 0, -5]} rotation={[0, Math.PI / -8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          crowdPosition={[3.5, 0, -5]}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={5}
          addGestureHype={addHype3}
        />
      </mesh>
    </>
  )
}

export default GesturesTutorial;