import { useEffect, useRef } from "react";

const GameOverSound = () => {
  const overSound = useRef(null);

  useEffect(() => {
    const overAudio = new Audio(
      `${import.meta.env.BASE_URL}Audio/soundEffects/crowdreaction_negative_01.mp3`,
    );

    overAudio.volume = 0.2;
    overSound.current = overAudio;

    return () => {
      overSound.current.pause();
    };
  }, []);

  const playOverSound = () => {
    if (overSound.current) {
      overSound.current.currentTime = 0;
      overSound.current.play();
    }
  };

  return playOverSound;
};

export default GameOverSound;
