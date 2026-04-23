import { useEffect, useRef, useState } from "react";
import { Text } from "@react-three/drei";
import TutorialCrowd from "./TutorialCrowd";
import TShirt from "../../Components/TShirt";
import { useFrame } from "@react-three/fiber";

const TShirtTutorial = ({opacity}) => {
  const [playerScore, setPlayerScore] = useState(0);
  const [canSpawnTShirt, setCanSpawnTShirt] = useState(true);
  const [addPointsOpacity, setAddPointsOpacity] = useState(0);
  const [addedPoints, setAddedPoints] = useState(false);
  const [tShirts, setTShirts] = useState([]);
  const [tShirtCount, setTShirtCount] = useState(0);
  const tShirtRefs = useRef([]);
  const ZLocation = -2.7;
  const fontSize = 0.15;
  const spawnRate = 8000;

  const updatePlayerScore = (value) => {
    setPlayerScore((prevTotal) => Math.max(prevTotal + value, 0));
  };

  useEffect(() => {
    if (canSpawnTShirt) {
      setCanSpawnTShirt(false);
      spawnTShirt();

      setTimeout(() => {
        setCanSpawnTShirt(true);
      }, spawnRate);
    }
  }, [canSpawnTShirt]);

  useFrame(() => {
    //animation for added points
    if (addedPoints) {
      if (addPointsOpacity > 0) {
        setAddPointsOpacity((prev) => Math.max(prev - 0.01, 0))
      } else {
        setAddedPoints(false);
        setAddPointsOpacity(0);
      }
    }
  });

  const showAddedPoints = () => {
    setAddPointsOpacity(1);
    setAddedPoints(true)
  }

  const spawnTShirt = () => {
    setTShirtCount((prev) => prev + 1);
    const newTShirt = {
      key: Date.now() + Math.random(),
      tShirtId: tShirtCount,
      deleteTShirt: deleteTShirt,
    }
    setTShirts((prev) => [...prev, newTShirt])
  }

  const deleteTShirt = (tShirtId) => {
    setTShirts((prev) =>
      prev.filter((tShirt) => tShirt.tShirtId !== tShirtId)
    );
  }

  return (
    <>
      <Text
        position={[0, 2.8, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        T-SHIRTS APPEAR AT RANDOM.
      </Text>
      <Text
        position={[0, 2.6, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={opacity}
      >
        THROW FOR EXTRA POINTS AND HYPE BOOST.
      </Text>

      {tShirts.map((tShirt, index) => (
        <TShirt
          key={tShirt.key}
          tShirtId={tShirt.tShirtId}
          deleteTShirt={deleteTShirt}
          ref={(ref) => (tShirtRefs.current[index] = ref)} // Assign ref here
        />
      ))}

      <Text position={[-6, 2.5, -6]} rotation={[0, 0.5, 0]} fontSize={0.4}>
        {playerScore}
      </Text>
      <Text 
        position={[-6, 2.1, -6]} 
        rotation={[0, 0.5, -0.1]} 
        fontSize={0.35}
        color={"green"}
        transparent={true}
        fillOpacity={addPointsOpacity}
      >
        +500!
      </Text>
      <mesh position={[-3.5, 0, -5]} rotation={[0, Math.PI / 8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={5}
          doHypeCounters={false}
          tShirtRefs={tShirtRefs}
          showAddPoints={showAddedPoints}
        />
      </mesh>
      <mesh position={[0, 0, -6]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={5.6}
          doHypeCounters={false}
          tShirtRefs={tShirtRefs}
          showAddPoints={showAddedPoints}
        />
      </mesh>
      <mesh position={[3.5, 0, -5]} rotation={[0, Math.PI / -8, 0]}>
        <TutorialCrowd
          opacity={opacity}
          updatePlayerScore={updatePlayerScore}
          hypeCounter={2}
          doHypeCounters={false}
          tShirtRefs={tShirtRefs}
          showAddPoints={showAddedPoints}
        />
      </mesh>
    </>
  )
}

export default TShirtTutorial;