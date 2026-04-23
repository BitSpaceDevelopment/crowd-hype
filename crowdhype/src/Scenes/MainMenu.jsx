import { Box, Plane, Text } from "@react-three/drei";
import GameInteractive from "../Components/GameInteractive";
import React, { useState, useContext, useEffect } from "react";
import * as THREE from "three";
import { MaterialRefsContext } from "../Components/RefsProvider";
import ButtonSound from "../Components/Sounds/ButtonSound";
import StartGameSound from "../Components/Sounds/StartGameSound";
import { useFrame, useLoader } from "@react-three/fiber";
import { useGameCore }  from "../Context/GameCoreContext";
import { fadeIn, handleSceneChange } from "../Animations/MenuAnimations";
import { stopSession } from "@react-three/xr";

const MainMenu = () => {
  const [hoveredQuit, setHoveredQuit] = useState(false);
  const [hoveredScores, setHoveredScores] = useState(false);
  const [hoveredSettings, setHoveredSettings] = useState(false);
  const [hoveredStart, setHoveredStart] = useState(false);
  const [hoveredTutorial, setHoveredTutorial] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [menuOpacity, setMenuOpacity] = useState(0);
  const [newScene, setNewScene] = useState();
  const { setCurrentScene } = useGameCore();
  const fontSize = 0.14;

  const logo = useLoader(THREE.TextureLoader, `${import.meta.env.BASE_URL}Textures/HHlogo.png`);
  const { addToMaterialRefs } = useContext(MaterialRefsContext);

  const playButtonSound = ButtonSound();
  const playStartSound = StartGameSound();

  useEffect(() => {
    setFadingIn(true);
  }, []);

  useFrame(() => {
    if (fadingIn){
      fadeIn(setMenuOpacity, setFadingIn)
    }
  })

  useFrame(() => {
    if (fadingOut) {
      handleSceneChange(
        newScene, setMenuOpacity, setCurrentScene, setFadingOut
      );
    }
  });

  const tryChangeScene = (newScene) => {
    if (menuOpacity === 1) {
      setNewScene(newScene)
      setFadingOut(true);
    }
  }

  const handleQuitGame = () => {
    stopSession();
  };

  return (
    <>
      {/* QUIT GAME */}
      <GameInteractive
        onHover={() => setHoveredQuit(true)}
        onBlur={() => setHoveredQuit(false)}
        onSelectStart={playButtonSound}
        onSelect={handleQuitGame}
      >
        <mesh position={[0, 0.7, -2.7]}>
          <Box args={[1.9, 0.2, 0.1]}>
            <meshBasicMaterial
              ref={addToMaterialRefs}
              color={hoveredQuit ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={menuOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={menuOpacity}
          >
            QUIT GAME
          </Text>
        </mesh>
      </GameInteractive>

      {/* HIGH SCORES */}
      <GameInteractive
        onHover={() => setHoveredScores(true)}
        onBlur={() => setHoveredScores(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("scores");
        }}
      >
        <mesh position={[-0.45, 1.3, -2.7]}>
          <Box args={[1, 0.2, 0.1]}>
            <meshBasicMaterial
              ref={addToMaterialRefs}
              color={hoveredScores ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={menuOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={menuOpacity}
          >
            HIGH SCORES
          </Text>
        </mesh>
      </GameInteractive>

      {/* CREDITS */}
      <GameInteractive
        onHover={() => setHoveredSettings(true)}
        onBlur={() => setHoveredSettings(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("credits")
        }}
      >
        <mesh position={[0.55, 1.3, -2.7]}>
          <Box args={[0.8, 0.2, 0.1]}>
            <meshBasicMaterial
              ref={addToMaterialRefs}
              color={hoveredSettings ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={menuOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={menuOpacity}
          >
            CREDITS
          </Text>
        </mesh>
      </GameInteractive>

      {/* START GAME */}
      <GameInteractive
        onHover={() => setHoveredStart(true)}
        onBlur={() => setHoveredStart(false)}
        onSelectStart={playStartSound}
        onSelect={() => {
          tryChangeScene("modeSelect")
        }}
      >
        <mesh position={[0, 1.6, -2.7]}>
          <Box args={[1.9, 0.2, 0.1]}>
            <meshBasicMaterial
              ref={addToMaterialRefs}
              color={hoveredStart ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={menuOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            color="#ffffff"
            transparent={true}
            fillOpacity={menuOpacity}
          >
            START GAME
          </Text>
        </mesh>
      </GameInteractive>

      {/* HOW TO PLAY */}
      <GameInteractive
        onHover={() => setHoveredTutorial(true)}
        onBlur={() => setHoveredTutorial(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("tutorial")
        }}
      >
        <mesh position={[0, 1, -2.7]}>
          <Box args={[1.9, 0.2, 0.1]}>
            <meshBasicMaterial
              ref={addToMaterialRefs}
              color={hoveredTutorial ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={menuOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={menuOpacity}
          >
            HOW TO PLAY
          </Text>
        </mesh>
      </GameInteractive>

      {/* Logo */}
      <Plane args={[2.5, 0.7]} position={[0, 2.3, -2.75]}>
        <meshBasicMaterial
          map={logo}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
          depthTest={true}
          opacity={menuOpacity}
        />
      </Plane>
    </>
  );
};

export default MainMenu;
