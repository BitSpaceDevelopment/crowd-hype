import React, { useEffect, useState } from "react";
import { RoundedBox, Text } from "@react-three/drei";
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
        transparent={true}
        fillOpacity={modeSelectOpacity}
        >
        Mode Select
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
          <RoundedBox
            args={[1.3, 0.2, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={hoveredSession ? "#777" : "#666"}
              transparent={true}
              opacity={modeSelectOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
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
          <RoundedBox
            args={[1.3, 0.2, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={hoveredEndless ? "#777" : "#666"}
              transparent={true}
              opacity={modeSelectOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
            transparent={true}
            fillOpacity={modeSelectOpacity}
          >
            ENDLESS MODE
          </Text>
        </mesh>
      </GameInteractive>

      {/* Back to main menu button */}
      <GameInteractive
        onHover={() => setHoverBackModeSelect(true)}
        onBlur={() => setHoverBackModeSelect(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("mainMenu");
        }}
      >
        <mesh position={[-1.3, 1.6, ZLocation]}>
          <RoundedBox
            args={[0.7, 0.2, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={hoverBackModeSelect ? "#777" : "#666"}
              transparent={true}
              opacity={modeSelectOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
            transparent={true}
            fillOpacity={modeSelectOpacity}
          >
            BACK
          </Text>
        </mesh>
      </GameInteractive>
      <Text
        position={[0, 0.5, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={modeSelectOpacity}
      >
        SESSION: 2 MINUTE SESSIONS
      </Text>
      <Text
        position={[0, 0.3, ZLocation]}
        fontSize={fontSize}
        transparent={true}
        fillOpacity={modeSelectOpacity}
      >
        ENDLESS: PLAY UNTIL YOU LOSE
      </Text>
    </>
  )
}

export default ModeSelect;