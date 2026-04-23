import React, { useEffect, useState } from "react";
import { RoundedBox, Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
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
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Credits
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 2.7, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
        >
        Developer: Zander Toews
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 2.55, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
        >
        Developer: Henry Breukelman
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 2.4, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Artist: Nathaniel Lie
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 2.25, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Artist: Justin Little
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 2.1, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Music Editor: MJ
        
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 1.95, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Team Lead: Violet Laudinsky
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 1.8, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Emotional Support Lead: The Real MattyB
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 1.65, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Project manager: Jameel deBeer
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 1.5, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Consultant: Doug Campbell
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 1.35, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Menu Music By: Lance Conrad
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 1.2, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Rock and Pop Music By: Nicko Gloire
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 1.05, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Country Music By: Alana Jordan
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 0.9, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        EDM Music By: Juniorsoundays
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 0.75, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Hip-Hop Music By: David Cutter
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 0.6, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Phonk Music By: Godmode
      </Text>
      <Text 
        fontSize={textSize} 
        position={[0, 0.45, XLocation]}
        transparent={true}
        fillOpacity={creditsOpacity}
      >
        Chip Tune Music By: Lesia Kower
      </Text>

      <Interactive
        onHover={() => setHoverBackCredit(true)}
        onBlur={() => setHoverBackCredit(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("mainMenu")
        }}
      >
        <mesh position={[0, 0.2, XLocation]}>
          <RoundedBox
            args={[1.2, 0.2, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={hoverBackCredit ? "#777" : "#666"}
              transparent={true}
              opacity={creditsOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={0.14}
            transparent={true}
            fillOpacity={creditsOpacity}
          >
            Back To Menu
          </Text>
        </mesh>
      </Interactive>
    </>
  );
};

export default Credits;
