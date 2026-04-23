import GameInteractive from "./GameInteractive";
import React, { useEffect, useRef, useState } from "react";
import Crowd from "./Crowd";
import { Text } from "@react-three/drei";
import GameOverScreen from "../Scenes/GameOverScreen";
import GameOverSound from "./Sounds/GameOverSound";
import { useGameCore } from "../Context/GameCoreContext";
import Tomato from "./Tomato";
import { useFrame } from "@react-three/fiber";
import TShirt from "./TShirt";
import Gestures from "./Gestures";

// Props
const CrowdTarget = ({
  playerScore,
  setPlayerScore,
  multiplier,
  setMultiplier,
  backGroundOpacity,
  setBackGroundOpacity,
}) => {
  const [gameOverOpacity, setGameOverOpacity] = useState(0);
  const [gameOverOverlay, setGameOverOverlay] = useState(0);
  const [gameOverY, setGameOverY] = useState(-10);
  const [gameOver, setGameOver] = useState(false);
  const [resetCounter, setResetCounter] = useState(false);
  const [showHighScoreInput, setShowHighScoreInput] = useState(false);
  const [deductedPointsOpacity, setDeductedPointsOpacity] = useState(0);
  const [deductedPoints, setDeductedPoints] = useState(false);
  const [addPointsOpacity, setAddPointsOpacity] = useState(0);
  const [addedPoints, setAddedPoints] = useState(false);
  const [tShirts, setTShirts] = useState([]);
  const [tShirtCount, setTShirtCount] = useState(0);
  const [canSpawnTShirt, setCanSpawnTShirt] = useState(false);
  const [addHype1, setAddHype1] = useState(false);
  const [addHype2, setAddHype2] = useState(false);
  const [addHype3, setAddHype3] = useState(false);
  const [timer, setTimer] = useState(120); //session mode time in seconds
  const [formatTime, setFormatTime] = useState("2:00");
  const playOverSound = GameOverSound();
  const playersScore = Math.floor(playerScore);
  const theMultiplier = Math.floor(multiplier);
  const tShirtRefs = useRef([]);

  const minTShirtStartTime = 8000;
  const maxTShirtStartTime = 10000;
  const minTShirtSpawnTime = 10000;
  const maxTShirtSpawnTime = 20000;

  const { 
    setCurrentScene, 
    pauseGameMusic, 
    playMenuMusic, 
    tomatoes, 
    setTomatoes,
    setVenue,
    selectedMode,
    setMode,
  } = useGameCore();

  const getRanNum = (min, max) => Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

  const isSession = selectedMode === 'session';

  useEffect(() => {
    //timer before t-shirts can spawn
    const ranTShirtTime = getRanNum(minTShirtStartTime, maxTShirtStartTime);
    setTimeout(() => {
      setCanSpawnTShirt(true);
    }, ranTShirtTime)
  }, [])

  useEffect(() => {
    if (gameOver || !isSession) return;
    
    const interval = setInterval(() => {
      setTimer((prev) => Math.max(prev - 1, 0));
    }, 1000);

    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    setFormatTime(
      `${String(minutes).padStart(1, "0")}:${String(seconds).padStart(2, "0")}`
    )

    if (timer <= 0){
      handleGameOver();
    }

    return () => clearInterval(interval);
  }, [timer])

  useEffect(() => {
    if (canSpawnTShirt && !gameOver) {
      setCanSpawnTShirt(false);
      const randomTimeout = getRanNum(minTShirtSpawnTime, maxTShirtSpawnTime);
      spawnTShirt();

      setTimeout(() => {
        setCanSpawnTShirt(true);
      }, randomTimeout);
    }
  }, [canSpawnTShirt])

  useEffect(() => {
    if(gameOver) {
      setTomatoes([]);
      setTShirts([]);
    }
  }, [gameOver])

  useFrame(() => {
    //animation for deducted points
    if (deductedPoints) {
      if (deductedPointsOpacity > 0) {
        setDeductedPointsOpacity((prev) => Math.max(prev - 0.01, 0)
        )
      } else {
        setDeductedPoints(false);
        setDeductedPointsOpacity(0);
      }
    }

    //animation for added points
    if (addedPoints) {
      if (addPointsOpacity > 0) {
        setAddPointsOpacity((prev) => Math.max(prev - 0.01, 0))
      } else {
        setAddedPoints(false);
        setAddPointsOpacity(0);
      }
    }
  })

  // Function for displaying game over screen
  const handleGameOver = () => {
    pauseGameMusic();
    setGameOverY(0);
    setGameOverOpacity(1);
    setGameOverOverlay(0.7);
    setGameOver(true);
    playOverSound();
  };

  // Function for restarting game and resetting states
  const handleContinue = () => {
    setGameOverY(-10);
    setGameOverOpacity(0);
    setGameOverOverlay(0);
    setGameOver(false);
    setPlayerScore(0);
    setMultiplier(0);
    setResetCounter(true);
    setBackGroundOpacity(1);
    setShowHighScoreInput(false);
    setVenue("mainStage")
    setCurrentScene("mainMenu");
    playMenuMusic();
    setMode("");
  };

  // Function for updating the players score
  const updatePlayerScore = (value) => {
    setPlayerScore((prevTotal) => Math.max(prevTotal + value, 0));
  };

  const showAddedPoints = () => {
    setAddPointsOpacity(1);
    setAddedPoints(true)
  }

  //Function to show deducted points when hit with tomato
  const showDeductedPoints = () => {
    setDeductedPointsOpacity(1);
    setDeductedPoints(true);
  }

  //Adds t-shirt to array
  const spawnTShirt = () => {
    setTShirtCount((prev) => prev + 1);
    const newTShirt = {
      key: Date.now() + Math.random(),
      tShirtId: tShirtCount,
      deleteTShirt: deleteTShirt,
    }
    setTShirts((prev) => [...prev, newTShirt])
  }

  const deleteTShirt = (tShirtId) => {
    setTShirts((prev) =>
      prev.filter((tShirt) => tShirt.tShirtId !== tShirtId)
    );
  }

  return (
    <>
      <GameInteractive>
        {/* Interactive Crowd for gaining score (left) */}
        <mesh position={[-3.5, 0, -5]} rotation={[0, Math.PI / 8, 0]}>
          <Crowd
            updatePlayerScore={updatePlayerScore}
            playerScore={playerScore}
            backGroundOpacity={backGroundOpacity}
            onGameOver={handleGameOver}
            gameOver={gameOver}
            resetCounter={resetCounter}
            setResetCounter={setResetCounter}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
            crowdPosition={[-3.5, 0, -5]}
            showDeductedPoints={showDeductedPoints}
            showAddPoints={showAddedPoints}
            addGestureHype={addHype1}
            tShirtRefs={tShirtRefs}
          />
        </mesh>

        {/* Interactive Crowd for gaining score (middle) */}
        <mesh position={[0, 0, -6]}>
          <Crowd
            updatePlayerScore={updatePlayerScore}
            playerScore={playerScore}
            backGroundOpacity={backGroundOpacity}
            onGameOver={handleGameOver}
            gameOver={gameOver}
            resetCounter={resetCounter}
            setResetCounter={setResetCounter}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
            crowdPosition={[0, 0, -6]}
            showDeductedPoints={showDeductedPoints}
            showAddPoints={showAddedPoints}
            addGestureHype={addHype2}
            tShirtRefs={tShirtRefs}
          />
        </mesh>

        {/* Interactive Crowd for gaining score (right) */}
        <mesh position={[3.5, 0, -5]} rotation={[0, Math.PI / -8, 0]}>
          <Crowd
            updatePlayerScore={updatePlayerScore}
            playerScore={playerScore}
            backGroundOpacity={backGroundOpacity}
            onGameOver={handleGameOver}
            gameOver={gameOver}
            resetCounter={resetCounter}
            setResetCounter={setResetCounter}
            multiplier={multiplier}
            setMultiplier={setMultiplier}
            crowdPosition={[3.5, 0, -5]}
            showDeductedPoints={showDeductedPoints}
            showAddPoints={showAddedPoints}
            addGestureHype={addHype3}
            tShirtRefs={tShirtRefs}
          />
        </mesh>
      </GameInteractive>

      {/* Display total additions */}
      <Text position={[-6, 3, -6]} rotation={[0, 0.5, 0]} fontSize={0.4}>
        Score
      </Text>
      <Text position={[-6, 2.5, -6]} rotation={[0, 0.5, 0]} fontSize={0.4}>
        {playersScore}
      </Text>
      <Text
        position={[-5.4, 2.8, -6.3]}
        rotation={[0, 0.5, 0.4]}
        fontSize={0.2}
      >
        x {theMultiplier}
      </Text>
      <Text 
        position={[-6, 2.1, -6]} 
        rotation={[0, 0.5, 0.1]} 
        fontSize={0.35}
        color={"red"}
        transparent={true}
        fillOpacity={deductedPointsOpacity}
      >
        -500!
      </Text>
      <Text 
        position={[-6, 2.1, -6]} 
        rotation={[0, 0.5, -0.1]} 
        fontSize={0.35}
        color={"green"}
        transparent={true}
        fillOpacity={addPointsOpacity}
      >
        +500!
      </Text>

      {/*Timer*/}
      {isSession && (
        <Text
          position={[6, 3, -6]}
          rotation={[0, -0.5, 0]}
          fontSize={0.4}
        >
          {formatTime}
        </Text>
      )}

      {/* Props for game over component */}
      <GameOverScreen
        gameOverOpacity={gameOverOpacity}
        gameOverOverlay={gameOverOverlay}
        setGameOverOpacity={setGameOverOpacity}
        playerScore={playersScore}
        onContinue={handleContinue}
        gameOver={gameOver}
        showHighScoreInput={showHighScoreInput}
        setShowHighScoreInput={setShowHighScoreInput}
        gameOverY={gameOverY}
      />

      {/*array of tomatoes*/}
      {tomatoes.map((tomato) => (
        <Tomato
          key={tomato.key}
          tomatoId={tomato.tomatoId}
          targetX={tomato.targetX}
          targetY={tomato.targetY}
          targetZ={tomato.targetZ}
          startX={tomato.startX}
          startY={tomato.startY}
          startZ={tomato.startZ}
          hitGround={tomato.hitGround}
          hitPlayer={tomato.hitPlayer}
          playerPosition={tomato.playerPosition}
        />
      ))}

      {tShirts.map((tShirt, index) => (
        <TShirt
          key={tShirt.key}
          tShirtId={tShirt.tShirtId}
          deleteTShirt={deleteTShirt}
          ref={(ref) => (tShirtRefs.current[index] = ref)} // Assign ref here
        />
      ))}

      <Gestures 
        setAddHype1={setAddHype1}
        setAddHype2={setAddHype2}
        setAddHype3={setAddHype3}
        gameOver={gameOver}
        updatePlayScore={updatePlayerScore}  
      />
    </>
  );
};

export default CrowdTarget;
