import { Text } from "@react-three/drei";
import React, { useState } from "react";
import { useGameCore } from "../Context/GameCoreContext";
import GameInteractive from "./GameInteractive";

/*
  Used for testing in VR. 
*/

const ConsoleLogs = () => {
  const { logs } = useGameCore();
  const [offsetY, setOffsetY] = useState(0); // Total vertical offset

  const handleMove = () => {
    setOffsetY((prev) => prev + 0.4);
  }

  return (
    <>
      <GameInteractive onSelect={() => {
        handleMove();
      }}>
        {logs.map((log, index) => (
          <Text
            key={index}
            fontSize={0.1}
            position={[-2, 3 - index * 0.2 + offsetY, -1]} // Adjust Y position for each log
            rotation={[0, 1, 0]}
          >
            {log}
          </Text>
        ))}
      </GameInteractive>
    </>
  );
};

export default ConsoleLogs;
