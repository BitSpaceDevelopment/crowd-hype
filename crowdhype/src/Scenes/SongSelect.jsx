import React, { useEffect, useState } from "react";
import { Box, Text } from "@react-three/drei";
import GameInteractive from "../Components/GameInteractive";
import ButtonSound from "../Components/Sounds/ButtonSound";
import { useGameCore }  from "../Context/GameCoreContext";
import { fadeIn, handleSceneChange } from "../Animations/MenuAnimations";
import { useFrame } from "@react-three/fiber";

const SongButton = ({
  genre, setHovered, yLocation, hovered, text, opacity, tryChangeScene
}) => {
  const ZLocation = -2.7;
  const fontSize = 0.15;
  const { playGameMusic, pauseMenuMusic } = useGameCore();
  const playButtonSound = ButtonSound();

  return (
    <>
      <GameInteractive
        onHover={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("startGame", genre);
          setTimeout(() => {
            playGameMusic();
            pauseMenuMusic();
          }, 1000)
        }}
      >
        <mesh position={[0, yLocation, ZLocation]}>
          <Box args={[1.3, 0.2, 0.1]}>
            <meshBasicMaterial
              color={hovered ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={opacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={opacity}
          >
            {text}
          </Text>
        </mesh>
      </GameInteractive>
    </>
  )
}

const SongSelect = () => {
  const fontSize = 0.15;
  const ZLocation = -2.7;
  const [hoverBackSongSelect, setHoverBackSongSelect] = useState(false);
  const playButtonSound = ButtonSound();
  const { setCurrentScene, setSong } = useGameCore();
  const [songSelectOpacity, setSongSelectOpacity] = useState(0);
  const [hoveredRock, setHoveredRock] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState(false);
  const [hoveredEdm, setHoveredEdm] = useState(false);
  const [hoveredPop, setHoveredPop] = useState(false);
  const [hoveredHipHop, setHoveredHipHop] = useState(false);
  const [hoveredFolkMetal, setHoveredFolkMetal] = useState(false);
  const [hoveredPhonk, setHoveredPhonk] = useState(false);
  const [hoveredChipTune, setHoveredChipTune] = useState(false);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [newScene, setNewScene] = useState();

  useEffect(() => {
    setFadingIn(true);
  }, []);

  useFrame(() => {
    if (fadingIn){
      fadeIn(setSongSelectOpacity, setFadingIn)
    }
  })

  useFrame(() => {
    if (fadingOut) {
      handleSceneChange(
        newScene, setSongSelectOpacity, setCurrentScene, setFadingOut
      );
    }
  });

  const tryChangeScene = (newScene, newSong = "phonk") => {
    if (songSelectOpacity === 1) {
      setNewScene(newScene);
      setSong(newSong);
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
        fillOpacity={songSelectOpacity}
      >
        SONG SELECT
      </Text>

      <SongButton genre={"rock"} setHovered={setHoveredRock} yLocation={2.4} hovered={hoveredRock} text={"ROCK"} opacity={songSelectOpacity} tryChangeScene={tryChangeScene} />
      <SongButton genre={"country"} setHovered={setHoveredCountry} yLocation={2.1} hovered={hoveredCountry} text={"COUNTRY"} opacity={songSelectOpacity} tryChangeScene={tryChangeScene} />
      <SongButton genre={"edm"} setHovered={setHoveredEdm} yLocation={1.8} hovered={hoveredEdm} text={"EDM"} opacity={songSelectOpacity} tryChangeScene={tryChangeScene} />
      <SongButton genre={"pop"} setHovered={setHoveredPop} yLocation={1.5} hovered={hoveredPop} text={"POP"} opacity={songSelectOpacity} tryChangeScene={tryChangeScene} />
      <SongButton genre={"hipHop"} setHovered={setHoveredHipHop} yLocation={1.2} hovered={hoveredHipHop} text={"HIP-HOP"} opacity={songSelectOpacity} tryChangeScene={tryChangeScene} />
      <SongButton genre={"phonk"} setHovered={setHoveredPhonk} yLocation={0.9} hovered={hoveredPhonk} text={"PHONK"} opacity={songSelectOpacity} tryChangeScene={tryChangeScene} />
      <SongButton genre={"chipTune"} setHovered={setHoveredChipTune} yLocation={0.6} hovered={hoveredChipTune} text={"CHIP TUNE"} opacity={songSelectOpacity} tryChangeScene={tryChangeScene} />
      <SongButton genre={"folkMetal"} setHovered={setHoveredFolkMetal} yLocation={0.3} hovered={hoveredFolkMetal} text={"FOLK METAL"} opacity={songSelectOpacity} tryChangeScene={tryChangeScene} />

      <GameInteractive
        onHover={() => setHoverBackSongSelect(true)}
        onBlur={() => setHoverBackSongSelect(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("venueSelect");
        }}
      >
        <mesh position={[-1.3, 1.6, ZLocation]}>
          <Box args={[0.7, 0.2, 0.1]}>
            <meshBasicMaterial
              color={hoverBackSongSelect ? "#2a2a2a" : "#1a1a1a"}
              transparent={true}
              opacity={songSelectOpacity}
            />
          </Box>
          <Text
            position={[0, 0, 0.06]}
            fontSize={fontSize}
            letterSpacing={0.05}
            transparent={true}
            fillOpacity={songSelectOpacity}
          >
            BACK
          </Text>
        </mesh>
      </GameInteractive>
    </>
  )
}

export default SongSelect
