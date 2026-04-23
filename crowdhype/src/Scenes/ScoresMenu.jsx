import { RoundedBox, Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import React, { useEffect, useState } from "react";
import ButtonSound from "../Components/Sounds/ButtonSound";
import { useGameCore }  from "../Context/GameCoreContext";
import { fadeIn, handleSceneChange } from "../Animations/MenuAnimations";
import { useFrame } from "@react-three/fiber";

const ScoresMenu = () => {
  const scoreFontSize = 0.12;
  const menuX = -2.7;
  const [hovered5, setHovered5] = useState(false);
  const [sessionScores, setSessionScores] = useState([]);
  const [endlessScores, setEndlessScores] = useState([])
  const playButtonSound = ButtonSound();
  const { setCurrentScene } = useGameCore();
  const [scoreMenuOpacity, setScoreMenuOpacity] = useState(0);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [newScene, setNewScene] = useState();

  useEffect(() => {
    setFadingIn(true);
  }, []);

  useFrame(() => {
    if (fadingIn){
      fadeIn(setScoreMenuOpacity, setFadingIn)
    }
  })

  useFrame(() => {
    if (fadingOut) {
      handleSceneChange(
        newScene, setScoreMenuOpacity, setCurrentScene, setFadingOut
      );
    }
  });

  const BASE_URL = process.env.REACT_APP_PUBLIC_BASE_URL;

  useEffect(() => {
    fadeIn(setScoreMenuOpacity)
  }, []);

  // API for getting the endless scores in the db
  useEffect(() => {
    fetch(`${BASE_URL}endlessScores`)
      .then((response) => response.json())
      .then((data) => {
        const formattedScores = data.rows
          .slice(0, 10) // displays the first 10
          .map((row) => `${row.name} ${row.points}`);
        setEndlessScores(formattedScores);
      })
      .catch((err) => console.error("Failed to fetch scores:", err));
  }, []);

  // API for getting the session scores in the db
  useEffect(() => {
    fetch(`${BASE_URL}sessionScores`)
      .then((response) => response.json())
      .then((data) => {
        const formattedScores = data.rows
          .slice(0, 10) // displays the first 10
          .map((row) => `${row.name} ${row.points}`);
        setSessionScores(formattedScores);
      })
      .catch((err) => console.error("Failed to fetch scores:", err));
  }, []);

  const tryChangeScene = (newScene) => {
    if (scoreMenuOpacity === 1) {
      setNewScene(newScene)
      setFadingOut(true);
    }
  }

  return (
    <>
      {/* Text for Highscores */}
      <Text
        position={[0, 3, menuX]}
        fontSize={0.3}
        transparent={true}
        fillOpacity={scoreMenuOpacity}
      >
        High Scores
      </Text>

      <Text
        position={[-0.83, 2.65, menuX]}
        fontSize={0.18}
        transparent={true}
        fillOpacity={scoreMenuOpacity}
      >
        Endless Mode
      </Text>

      <Text
        position={[0.83, 2.65, menuX]}
        fontSize={0.18}
        transparent={true}
        fillOpacity={scoreMenuOpacity}
      >
        Session Mode
      </Text>

      {/* Text for the players score / mapping texture */}
      {endlessScores.map((score, index) => (
        <Text
          key={index}
          position={[-0.83, 2.4 - 0.2 * index, menuX]}
          fontSize={scoreFontSize}
          transparent={true}
          fillOpacity={scoreMenuOpacity}
        >
          {score}
        </Text>
      ))}

      {sessionScores.map((score, index) => (
        <Text
          key={index}
          position={[0.83, 2.4 - 0.2 * index, menuX]}
          fontSize={scoreFontSize}
          transparent={true}
          fillOpacity={scoreMenuOpacity}
        >
          {score}
        </Text>
      ))}

      {/* Back to main menu button */}
      <Interactive
        onHover={() => setHovered5(true)}
        onBlur={() => setHovered5(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          tryChangeScene("mainMenu")
        }}
      >
        <mesh position={[0, 0.3, menuX]}>
          <RoundedBox
            args={[1.2, 0.2, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={hovered5 ? "#777" : "#666"}
              transparent={true}
              opacity={scoreMenuOpacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={0.14}
            transparent={true}
          fillOpacity={scoreMenuOpacity}
          >
            Back To Menu
          </Text>
        </mesh>
      </Interactive>
    </>
  );
};

export default ScoresMenu;
