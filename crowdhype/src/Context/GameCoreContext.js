import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const GameCoreContext = createContext();

export const useGameCore = () => useContext(GameCoreContext);

const BASE = import.meta.env.BASE_URL;

const GameCoreProvider = ({ children }) => {
  const { camera } = useThree();
  const [logs, setLogs] = useState(["logs"]); //For Testing
  const [playerPosition, setPlayerPosition] = useState(camera.position);
  const [currentScene, setCurrentScene] = useState("warning");
  const [selectedVenue, setVenue] = useState("mainStage");
  const [selectedMode, setMode] = useState("");
  const [tomatoes, setTomatoes] = useState([]);
  const [tomatoCount, setTomatoCount] = useState(0);
  const [song, setSong] = useState("chipTune");
  const gameMusic = useRef(null);
  const gameMusicLoop = useRef(null);
  const menuMusic = useRef(null);

  useFrame(() => {
    setPlayerPosition(camera.position);
  });

  const throwTomato = (startX, startY, startZ, hitGround, hitPlayer) => {
    const positionX = camera.position.x;
    const positionY = camera.position.y;
    const positionZ = camera.position.z;
    setTomatoCount((prev) => prev + 1);

    const newTomato = {
      key: tomatoCount + Date.now() + Math.random(),
      tomatoId: tomatoCount,
      targetX: positionX,
      targetY: positionY,
      targetZ: positionZ,
      startX: startX,
      startY: startY,
      startZ: startZ,
      hitGround: hitGround,
      hitPlayer: hitPlayer,
      playerPosition: playerPosition,
    };

    setTomatoes((prevTomatoes) => [...prevTomatoes, newTomato]);
  };

  const deleteTomato = (tomatoId) => {
    setTomatoes((prevTomatoes) =>
      prevTomatoes.filter((tomato) => tomato.tomatoId !== tomatoId),
    );
  };

  useEffect(() => {
    const menuAudio = new Audio(
      `${BASE}Audio/songs/Audiio_LanceConrad_LofiNerd_BassBuzzer.wav`,
    );

    menuAudio.loop = true;
    menuAudio.volume = 0.2;
    menuMusic.current = menuAudio;

    return () => {
      menuMusic.current.pause();
    };
  }, []);

  useEffect(() => {
    let gameAudio = null;
    let gameAudioLoop = null;

    //song selection
    switch (song) {
      case "chipTune":
        gameAudio = new Audio(`${BASE}Audio/songs/chip_tune.mp3`);
        gameAudioLoop = new Audio(`${BASE}Audio/songs/chip_tune_loop.mp3`);
        break;
      case "phonk":
        gameAudio = new Audio(`${BASE}Audio/songs/phonk.mp3`);
        gameAudioLoop = new Audio(`${BASE}Audio/songs/phonk_loop.mp3`);
        break;
      case "rock":
        gameAudio = new Audio(`${BASE}Audio/songs/rock.mp3`);
        gameAudioLoop = new Audio(`${BASE}Audio/songs/rock_loop.mp3`);
        break;
      case "country":
        gameAudio = new Audio(`${BASE}Audio/songs/country.mp3`);
        gameAudioLoop = new Audio(`${BASE}Audio/songs/country_loop.mp3`);
        break;
      case "edm":
        gameAudio = new Audio(`${BASE}Audio/songs/edm.mp3`);
        gameAudioLoop = new Audio(`${BASE}Audio/songs/edm_loop.mp3`);
        break;
      case "hipHop":
        gameAudio = new Audio(`${BASE}Audio/songs/hip_hop.mp3`);
        gameAudioLoop = new Audio(`${BASE}Audio/songs/hip_hop_loop.mp3`);
        break;
      case "pop":
        gameAudio = new Audio(`${BASE}Audio/songs/pop.mp3`);
        gameAudioLoop = new Audio(`${BASE}Audio/songs/pop_loop.mp3`);
        break;
      case "folkMetal":
        gameAudio = new Audio(`${BASE}Audio/songs/folk_metal.mp3`);
        gameAudioLoop = new Audio(`${BASE}Audio/songs/folk_metal_loop.mp3`);
        break;
      default:
        return;
    }

    if (gameAudio && gameAudioLoop) {
      gameAudio.volume = 0.5;
      gameAudioLoop.volume = 0.5;
      gameAudioLoop.loop = true;

      gameAudio.onended = () => {
        gameAudioLoop.currentTime = 0;
        gameAudioLoop.play();
      };

      gameMusic.current = gameAudio;
      gameMusicLoop.current = gameAudioLoop;
    }
  }, [song]);

  const playGameMusic = () => {
    if (gameMusic.current) {
      gameMusic.current.currentTime = 0;
      gameMusic.current.play();
    }
    if (gameMusicLoop.current) {
      gameMusicLoop.current.currentTime = 0;
    }
  };

  const pauseGameMusic = () => {
    if (gameMusic.current) {
      gameMusic.current.pause();
    }
    if (gameMusicLoop.current) {
      gameMusicLoop.current.pause();
    }
  };

  const playMenuMusic = () => {
    if (menuMusic.current) {
      menuMusic.current.currentTime = 0;
      menuMusic.current.play();
    }
  };

  const pauseMenuMusic = () => {
    if (menuMusic.current) {
      menuMusic.current.pause();
    }
  };

  return (
    <GameCoreContext.Provider
      value={{
        logs,
        setLogs,
        currentScene,
        setCurrentScene,
        tomatoes,
        setTomatoes,
        deleteTomato,
        throwTomato,
        selectedVenue,
        setVenue,
        selectedMode,
        setMode,
        playGameMusic,
        pauseGameMusic,
        playMenuMusic,
        pauseMenuMusic,
        gameMusic,
        menuMusic,
        playerPosition,
        setSong,
      }}
    >
      {children}
    </GameCoreContext.Provider>
  );
};

export default GameCoreProvider;
