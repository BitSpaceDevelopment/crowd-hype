import { Box, Text } from "@react-three/drei";
import GameInteractive from "../Components/GameInteractive";
import React, { useEffect, useState } from "react";
import ButtonSound from "../Components/Sounds/ButtonSound";
import { useGameCore } from "../Context/GameCoreContext";
import { fadeIn, handleSceneChange } from "../Animations/MenuAnimations";
import { useFrame } from "@react-three/fiber";
import { getScores } from "../utils/localScores";

const ScoresMenu = () => {
  const scoreFontSize = 0.12;
  const menuX = -2.7;
  const [hovered5, setHovered5] = useState(false);
  const [sessionScores, setSessionScores] = useState([]);
  const [endlessScores, setEndlessScores] = useState([]);
  const playButtonSound = ButtonSound();
  const { setCurrentScene } = useGameCore();
  const [scoreMenuOpacity, setScoreMenuOpacity] = useState(0);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [newScene, setNewScene] = useState();

  useEffect(() => {
    setFadingIn(true);
    const endless = getScores("endless").map((r) => `${r.name}   ${r.points}`);
    setEndlessScores(endless);
    const session = getScores("session").map((r) => `${r.name}   ${r.points}`);
    setSessionScores(session);
  }, []);

  useFrame(() => {
    if (fadingIn) {
      fadeIn(setScoreMenuOpacity, setFadingIn);
    }
  });

  useFrame(() => {
    if (fadingOut) {
      handleSceneChange(
        newScene,
        setScoreMenuOpacity,
        setCurrentScene,
        setFadingOut,
      );
    }
  });

  const tryChangeScene = (newScene) => {
    if (scoreMenuOpacity === 1) {
      setNewScene(newScene);
      setFadingOut(true);
    }
  };

  return (
    <>
      <Text
        position={[0, 3, menuX]}
        fontSize={0.3}
        letterSpacing={0.05}
        transparent={true}
        fillOpacity={scoreMenuOpacity}
      >
        HIGH SCORES
      </Text>

      <Text
        position={[-0.83, 2.65, menuX]}
        fontSize={0.15}
        letterSpacing={0.05}
        color="#aaa"
        transparent={true}
        fillOpacity={scoreMenuOpacity}
      >
        ENDLESS MODE
      </Text>

      <Text
        position={[0.83, 2.65, menuX]}
        fontSize={0.15}
        letterSpacing={0.05}
        color="#aaa"
        transparent={true}
        fillOpacity={scoreMenuOpacity}
      >
        SESSION MODE
      </Text>

      {endlessScores.map((score, index) => (
        <Text
          key={index}
          position={[-0.83, 2.4 - 0.2 * index, menuX]}
          fontSize={scoreFontSize}
          color="#e5e5e5"
          transparent={true}
          fillOpacity={scoreMenuOpacity}
        >
          {score}
        </Text>
      ))}

      {endlessScores.length === 0 && (
        <Text position={[-0.83, 2.4, menuX]} fontSize={scoreFontSize} color="#444" transparent={true} fillOpacity={scoreMenuOpacity}>
          No scores yet
        </Text>
      )}

      {sessionScores.map((score, index) => (
        <Text
          key={index}
          position={[0.83, 2.4 - 0.2 * index, menuX]}
          fontSize={scoreFontSize}
          color="#e5e5e5"
          transparent={true}
          fillOpacity={scoreMenuOpacity}
        >
          {score}
        </Text>
      ))}

      {sessionScores.length === 0 && (
        <Text position={[0.83, 2.4, menuX]} fontSize={scoreFontSize} color="#444" transparent={true} fillOpacity={scoreMenuOpacity}>
          No scores yet
        </Text>
      )}

      {/* Back to main menu button */}
      <GameInteractive
        onHover={() => setHovered5(true)}
        onBlur={() => setHovered5(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("mainMenu");
        }}
      >
        <mesh position={[0, 0.3, menuX]}>
          <Box args={[1.2, 0.2, 0.1]}>
            <meshBasicMaterial
              color={hovered5 ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={scoreMenuOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.14}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={scoreMenuOpacity}
          >
            BACK TO MENU
          </Text>
        </mesh>
      </GameInteractive>
    </>
  );
};

export default ScoresMenu;
