import React, { useEffect, useState } from "react";
import { RoundedBox, Text } from "@react-three/drei";
import GameInteractive from "../Components/GameInteractive";
import ButtonSound from "../Components/Sounds/ButtonSound";
import { useGameCore }  from "../Context/GameCoreContext";
import { fadeIn, handleSceneChange } from "../Animations/MenuAnimations";
import { useFrame } from "@react-three/fiber";

const VenueSelect = () => {
  const fontSize = 0.15;
  const ZLocation = -2.7;
  const playButtonSound = ButtonSound();
  const { setCurrentScene, setVenue } = useGameCore();
  const [venueSelectOpacity, setVenueSelectOpacity] = useState(0);
  const [hoveredBackVenue, setHoveredBackVenue] = useState(false);
  const [hoveredConcert, setHoveredConcert] = useState(false);
  const [hoveredGame, setHoveredGame] = useState(false);
  const [hoveredFestival, setHoveredFestival] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [newScene, setNewScene] = useState();

  useEffect(() => {
    setFadingIn(true);
    setVenue("mainStage");
  }, []);

  useFrame(() => {
    if (fadingIn){
      fadeIn(setVenueSelectOpacity, setFadingIn);
    }
  })

  useFrame(() => {
    if (fadingOut) {
      handleSceneChange(
        newScene, setVenueSelectOpacity, setCurrentScene, setFadingOut
      );
    }
  });

  const tryChangeScene = (newScene, newVenue = "mainStage") => {
    if (venueSelectOpacity === 1) {
      setNewScene(newScene)
      setFadingOut(true);
      setVenue(newVenue)
    }
  }

  return (
    <>
      <Text 
        fontSize={0.4} 
        position={[0, 3, ZLocation]}
        transparent={true}
        fillOpacity={venueSelectOpacity}
      >
        Choose Your Venue
      </Text>

      {/* Concert button */}
      <GameInteractive
        onHover={() => setHoveredConcert(true)}
        onBlur={() => setHoveredConcert(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("songSelect", "concert");
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
              color={hoveredConcert ? "#777" : "#666"}
              transparent={true}
              opacity={venueSelectOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
            transparent={true}
            fillOpacity={venueSelectOpacity}
          >
            CONCERT
          </Text>
        </mesh>
      </GameInteractive>

      {/* Game button */}
      <GameInteractive
        onHover={() => setHoveredGame(true)}
        onBlur={() => setHoveredGame(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("songSelect", "game");
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
              color={hoveredGame ? "#777" : "#666"}
              transparent={true}
              opacity={venueSelectOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
            transparent={true}
            fillOpacity={venueSelectOpacity}
          >
            GAME
          </Text>
        </mesh>
      </GameInteractive>

      {/* Festival button */}
      <GameInteractive
        onHover={() => setHoveredFestival(true)}
        onBlur={() => setHoveredFestival(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("songSelect", "festival");
        }}
      >
        <mesh position={[0, 1, ZLocation]}>
          <RoundedBox
            args={[1.3, 0.2, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={hoveredFestival ? "#777" : "#666"}
              transparent={true}
              opacity={venueSelectOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
            transparent={true}
            fillOpacity={venueSelectOpacity}
          >
            FESTIVAL
          </Text>
        </mesh>
      </GameInteractive>

      <GameInteractive
        onHover={() => setHoveredBackVenue(true)}
        onBlur={() => setHoveredBackVenue(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("modeSelect");
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
              color={hoveredBackVenue ? "#777" : "#666"}
              transparent={true}
              opacity={venueSelectOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
            transparent={true}
            fillOpacity={venueSelectOpacity}
          >
            BACK
          </Text>
        </mesh>
      </GameInteractive>
    </>
  )
}

export default VenueSelect;