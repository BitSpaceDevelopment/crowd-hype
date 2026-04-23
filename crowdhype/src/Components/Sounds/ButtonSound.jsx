import { useEffect, useRef } from "react";

const ButtonSound = () => {
  const buttonClickSound = useRef(null);

  useEffect(() => {
    const buttonClickAudio = new Audio(
      `${import.meta.env.BASE_URL}Audio/soundEffects/ui_click_rollover_misc_09.mp3`,
    );

    buttonClickAudio.volume = 0.3;
    buttonClickSound.current = buttonClickAudio;

    return () => {
      buttonClickSound.current.pause();
    };
  }, []);

  const playButtonSound = () => {
    if (buttonClickSound.current) {
      buttonClickSound.current.currentTime = 0;
      buttonClickSound.current.play();
    }
  };

  return playButtonSound;
};

export default ButtonSound;
