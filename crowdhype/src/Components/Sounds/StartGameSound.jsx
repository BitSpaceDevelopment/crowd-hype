import { useEffect, useRef } from "react";

const StartGameSound = () => {
  const startSound = useRef(null);

  useEffect(() => {
    const starAudio = new Audio("/Audio/soundEffects/coin_03.mp3");

    starAudio.volume = 0.2;
    startSound.current = starAudio;

    return () => {
      startSound.current.pause();
    };
  }, []);

  const playStartSound = () => {
    if (startSound.current) {
      startSound.current.currentTime = 0;
      startSound.current.play();
    }
  };

  return playStartSound;
};

export default StartGameSound;
