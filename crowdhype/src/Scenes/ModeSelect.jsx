import React, { useEffect, useState } from "react";
import { Box, Text } from "@react-three/drei";
import GameInteractive from "../Components/GameInteractive";
import ButtonSound from "../Components/Sounds/ButtonSound";
import { useGameCore }  from "../Context/GameCoreContext";
import { fadeIn, handleSceneChange } from "../Animations/MenuAnimations";
import { useFrame } from "@react-three/fiber";

const ModeSelect = () => {
  const fontSize = 0.15;
  const ZLocation = -2.7;
  const [hoverBackModeSelect, setHoverBackModeSelect] = useState(false);
  const playButtonSound = ButtonSound();
  const { setCurrentScene, setMode } = useGameCore();
  const [modeSelectOpacity, setModeSelectOpacity] = useState(0);
  const [hoveredEndless, setHoveredEndless] = useState(false);
  const [hoveredSession, setHoveredSession] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [newScene, setNewScene] = useState();

  useEffect(() => {
    setFadingIn(true);
  }, []);

  useFrame(() => {
    if (fadingIn){
      fadeIn(setModeSelectOpacity, setFadingIn)
    }
  })

  useFrame(() => {
    if (fadingOut) {
      handleSceneChange(
        newScene, setModeSelectOpacity, setCurrentScene, setFadingOut
      );
    }
  });

  const tryChangeScene = (newScene) => {
    if (modeSelectOpacity === 1) {
      setNewScene(newScene)
      setFadingOut(true);
    }
  }

  return (
    <>
      <Text
        fontSize={0.4}
        position={[0, 3, ZLocation]}
        letterSpacing={0.05}
        transparent={true}
        fillOpacity={modeSelectOpacity}
      >
        MODE SELECT
      </Text>

      {/* Session button */}
      <GameInteractive
        onHover={() => setHoveredSession(true)}
        onBlur={() => setHoveredSession(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          setMode("session");
          tryChangeScene("venueSelect");
        }}
      >
        <mesh position={[0, 1.6, ZLocation]}>
          <Box args={[1.3, 0.2, 0.1]}>
            <meshBasicMaterial
              color={hoveredSession ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={modeSelectOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={modeSelectOpacity}
          >
            SESSION MODE
          </Text>
        </mesh>
      </GameInteractive>

      {/* Endless button */}
      <GameInteractive
        onHover={() => setHoveredEndless(true)}
        onBlur={() => setHoveredEndless(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          setMode("endless");
          tryChangeScene("venueSelect");
        }}
      >
        <mesh position={[0, 1.3, ZLocation]}>
          <Box args={[1.3, 0.2, 0.1]}>
            <meshBasicMaterial
              color={hoveredEndless ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={modeSelectOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={modeSelectOpacity}
          >
            ENDLESS MODE
          </Text>
        </mesh>
      </GameInteractive>

      {/* Back button */}
      <GameInteractive
        onHover={() => setHoverBackModeSelect(true)}
        onBlur={() => setHoverBackModeSelect(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("mainMenu");
        }}
      >
        <mesh position={[-1.3, 1.6, ZLocation]}>
          <Box args={[0.7, 0.2, 0.1]}>
            <meshBasicMaterial
              color={hoverBackModeSelect ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={modeSelectOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={modeSelectOpacity}
          >
            BACK
          </Text>
        </mesh>
      </GameInteractive>

      <Text
        position={[0, 0.5, ZLocation]}
        fontSize={0.11}
        letterSpacing={0.05}
        color="#555"
        transparent={true}
        fillOpacity={modeSelectOpacity}
      >
        SESSION — 2 MINUTE SESSIONS
      </Text>
      <Text
        position={[0, 0.35, ZLocation]}
        fontSize={0.11}
        letterSpacing={0.05}
        color="#555"
        transparent={true}
        fillOpacity={modeSelectOpacity}
      >
        ENDLESS — PLAY UNTIL YOU LOSE
      </Text>
    </>
  )
}

export default ModeSelect;
