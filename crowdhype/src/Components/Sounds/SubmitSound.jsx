import { useEffect, useRef } from "react";

const SubmitSound = () => {
  const continueSound = useRef(null);

  useEffect(() => {
    const continueAudio = new Audio(`${import.meta.env.BASE_URL}Audio/soundEffects/coin_05.mp3`);

    continueAudio.volume = 0.2;
    continueSound.current = continueAudio;

    return () => {
      continueSound.current.pause();
    };
  }, []);

  const playSubmitSound = () => {
    if (continueSound.current) {
      continueSound.current.currentTime = 0;
      continueSound.current.play();
    }
  };

  return playSubmitSound;
};

export default SubmitSound;
