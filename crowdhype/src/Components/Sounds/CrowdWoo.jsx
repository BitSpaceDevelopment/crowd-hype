import { useEffect, useRef } from "react";

const CrowdWoo = () => {
  const crowdSound = useRef(null);

  useEffect(() => {
    const crowdAudio = new Audio("/Audio/soundEffects/woo-3.wav");

    crowdAudio.volume = 0.2;
    crowdSound.current = crowdAudio;

    return () => {
      crowdSound.current.pause();
    };
  }, []);

  const playCrowdSound = () => {
    if (crowdSound.current) {
      crowdSound.current.currentTime = 0;
      crowdSound.current.play();
    }
  };

  return playCrowdSound;
};

export default CrowdWoo;
