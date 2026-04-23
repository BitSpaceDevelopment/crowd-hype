import React, { useEffect, useState } from "react";
import { Box, Text } from "@react-three/drei";
import GameInteractive from "../Components/GameInteractive";
import ButtonSound from "../Components/Sounds/ButtonSound";
import { useGameCore }  from "../Context/GameCoreContext";
import { fadeIn, handleSceneChange } from "../Animations/MenuAnimations";
import { useFrame } from "@react-three/fiber";

const Credits = () => {
  const textSize = 0.12;
  const XLocation = -2.7;
  const [hoverBackCredit, setHoverBackCredit] = useState(false);
  const playButtonSound = ButtonSound();
  const { setCurrentScene } = useGameCore();
  const [creditsOpacity, setCreditsOpacity] = useState(0);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [newScene, setNewScene] = useState();

  useEffect(() => {
    setFadingIn(true);
  }, []);

  useFrame(() => {
    if (fadingIn){
      fadeIn(setCreditsOpacity, setFadingIn)
    }
  })

  useFrame(() => {
    if (fadingOut) {
      handleSceneChange(
        newScene, setCreditsOpacity, setCurrentScene, setFadingOut
      );
    }
  });

  const tryChangeScene = (newScene) => {
    if (creditsOpacity === 1) {
      setNewScene(newScene)
      setFadingOut(true);
    }
  }

  return (
    <>
      <Text
        fontSize={0.3}
        position={[0, 3, XLocation]}
        letterSpacing={0.05}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        CREDITS
      </Text>
      <Text fontSize={textSize} position={[0, 2.7, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Developer: Zander Toews
      </Text>
      <Text fontSize={textSize} position={[0, 2.55, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Developer: Henry Breukelman
      </Text>
      <Text fontSize={textSize} position={[0, 2.4, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Artist: Nathaniel Lie
      </Text>
      <Text fontSize={textSize} position={[0, 2.25, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Artist: Justin Little
      </Text>
      <Text fontSize={textSize} position={[0, 2.1, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Music Editor: MJ
      </Text>
      <Text fontSize={textSize} position={[0, 1.95, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Team Lead: Violet Laudinsky
      </Text>
      <Text fontSize={textSize} position={[0, 1.8, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Emotional Support Lead: The Real MattyB
      </Text>
      <Text fontSize={textSize} position={[0, 1.65, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Project Manager: Jameel deBeer
      </Text>
      <Text fontSize={textSize} position={[0, 1.5, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Consultant: Doug Campbell
      </Text>
      <Text fontSize={textSize} position={[0, 1.35, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Menu Music By: Lance Conrad
      </Text>
      <Text fontSize={textSize} position={[0, 1.2, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Rock &amp; Pop Music By: Nicko Gloire
      </Text>
      <Text fontSize={textSize} position={[0, 1.05, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Country Music By: Alana Jordan
      </Text>
      <Text fontSize={textSize} position={[0, 0.9, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        EDM Music By: Juniorsoundays
      </Text>
      <Text fontSize={textSize} position={[0, 0.75, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Hip-Hop Music By: David Cutter
      </Text>
      <Text fontSize={textSize} position={[0, 0.6, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Phonk Music By: Godmode
      </Text>
      <Text fontSize={textSize} position={[0, 0.45, XLocation]} transparent={true} fillOpacity={creditsOpacity} color="#aaa">
        Chip Tune Music By: Lesia Kower
      </Text>

      <GameInteractive
        onHover={() => setHoverBackCredit(true)}
        onBlur={() => setHoverBackCredit(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("mainMenu")
        }}
      >
        <mesh position={[0, 0.2, XLocation]}>
          <Box args={[1.2, 0.2, 0.1]}>
            <meshBasicMaterial
              color={hoverBackCredit ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={creditsOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.14}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={creditsOpacity}
          >
            BACK TO MENU
          </Text>
        </mesh>
      </GameInteractive>
    </>
  );
};

export default Credits;
