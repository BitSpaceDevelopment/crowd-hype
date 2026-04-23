import { useEffect, useRef } from "react";

const TomatoSound = () => {
  const tomatoSound = useRef(null);

  useEffect(() => {
    const tomatoAudio = new Audio("/Audio/soundEffects/slime-splat-1-219248.mp3");

    tomatoAudio.volume = 0.3;
    tomatoSound.current = tomatoAudio;
  }, []);

  const playTomatoSound = () => {
    if (tomatoSound.current) {
      tomatoSound.current.currentTime = 0;
      tomatoSound.current.play();
    }
  };

  return playTomatoSound;
};

export default TomatoSound