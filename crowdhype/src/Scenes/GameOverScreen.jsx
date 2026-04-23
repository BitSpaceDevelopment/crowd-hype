import React, { useEffect, useRef, useState } from "react";
import { Plane, RoundedBox, Text } from "@react-three/drei";
import { MeshStandardMaterial } from "three";
import HighScoreInput from "../Components/HighScoreInput";
import { Interactive } from "@react-three/xr";
import SubmitSound from "../Components/Sounds/SubmitSound";
import * as THREE from "three";
import BannedWordsList from "../Components/BannedWordsList";
import { useGameCore } from "../Context/GameCoreContext";
import { addScore, qualifiesForLeaderboard } from "../utils/localScores";

const GameOverScreen = ({
  gameOverOpacity,
  playerScore,
  onContinue,
  gameOver,
  showHighScoreInput,
  setShowHighScoreInput,
  gameOverOverlay,
  gameOverY,
}) => {
  const [nameLetters, setNameLetters] = useState([" ", " ", " "]);
  const gameOverLight = useRef();
  const [continueEnabled, setContinueEnabled] = useState(true);
  const [badWordError, setBadWordError] = useState(-10);
  const [hoverBackModeSelect, setHoverBackModeSelect] = useState(false);

  const { selectedMode } = useGameCore();
  const mode = selectedMode === "session" ? "session" : "endless";

  const playSubmitSound = SubmitSound();

  const transparentMaterial = new MeshStandardMaterial({
    transparent: true,
    opacity: gameOverOpacity,
  });

  const emissiveRed = new MeshStandardMaterial({
    emissive: "#b30000",
    emissiveIntensity: 10,
  });

  const emissiveWhite = new MeshStandardMaterial({
    emissive: "#fff",
    emissiveIntensity: 10,
  });

  const hasBannedWord = (name) => {
    return BannedWordsList.some((word) => name.toLowerCase().includes(word));
  };

  const setSpotlightTarget = (spotlightRef, position) => {
    if (spotlightRef.current) {
      spotlightRef.current.target.position.set(
        position[0],
        position[1],
        position[2],
      );
    }
  };

  useEffect(() => {
    setSpotlightTarget(gameOverLight, [0, 1.7, -2.7]);

    if (gameOver && qualifiesForLeaderboard(mode, playerScore)) {
      setShowHighScoreInput(true);
    }
  }, [gameOver, playerScore]);

  const handleContinue = () => {
    const playerName = nameLetters.join("").trim();
    if (hasBannedWord(playerName)) {
      console.log("thats a no no word");
      setContinueEnabled(false);
      setBadWordError(1.1);
      setTimeout(() => {
        setContinueEnabled(true);
        setBadWordError(-10);
      }, 2000);
      return;
    }
    if (showHighScoreInput) {
      addScore(mode, playerName, playerScore);
    }
    onContinue();
    setContinueEnabled(false);
  };

  return (
    <>
      <Text
        position={[0, 2.7 + gameOverY, -2.7]}
        fontSize={0.5}
        color="#b30000"
        material={transparentMaterial && emissiveRed}
      >
        Game Over
      </Text>

      <Text
        position={[0, 2.2 + gameOverY, -2.7]}
        fontSize={0.2}
        material={transparentMaterial && emissiveWhite}
      >
        Your Score
      </Text>

      <Text
        position={[0, 1.8 + gameOverY, -2.7]}
        fontSize={0.35}
        material={transparentMaterial && emissiveWhite}
      >
        {playerScore}
      </Text>

      {/* Button to save score and return to menu */}
      <Interactive
        onHover={() => setHoverBackModeSelect(true)}
        onBlur={() => setHoverBackModeSelect(false)}
        onSelectStart={playSubmitSound}
        onSelect={handleContinue}
      >
        <mesh position={[0, 0.15 + gameOverY, -2.65]} rotation={[-0.4, 0, 0]}>
          <RoundedBox
            args={[1.2, 0.3, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={
                continueEnabled
                  ? hoverBackModeSelect
                    ? "#777"
                    : "#666"
                  : "#b30000"
              }
              transparent={true}
              opacity={gameOverOpacity}
            />
          </RoundedBox>
          <Text
            fontSize={[0.19]}
            position={[0, 0, 0.01]}
            material={transparentMaterial && emissiveWhite}
          >
            Continue
          </Text>
        </mesh>
      </Interactive>

      <Text position={[0, badWordError, -2]} fontSize={0.25} color="#b30000">
        Name is not allowed
      </Text>

      <Plane args={[3, 0.5]} position={[0, badWordError, -2.001]}>
        <meshBasicMaterial color="#000" />
      </Plane>

      {/* A translucent plane to cover crowd */}
      <Plane args={[17, 13]} position={[0, 1.5, -3.5]}>
        <meshStandardMaterial
          color="#000"
          transparent={true}
          opacity={gameOverOverlay}
          side={THREE.DoubleSide}
        />
      </Plane>

      <mesh position={[0, 1.5, -3.5]} rotation={[0, Math.PI * 1.5, 0]}>
        <cylinderGeometry args={[8.5, 8.5, 13, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial
          color="#000"
          transparent={true}
          opacity={gameOverOverlay}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Conditional rendering to determine if player has a high score*/}
      {showHighScoreInput && (
        <HighScoreInput
          playerScore={playerScore}
          nameLetters={nameLetters}
          setNameLetters={setNameLetters}
          emissiveWhite={emissiveWhite}
        />
      )}
    </>
  );
};

export default GameOverScreen;
