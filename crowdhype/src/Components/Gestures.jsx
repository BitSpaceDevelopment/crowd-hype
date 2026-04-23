import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import NowOverHereLeft from "./Gestures/NowOverHereLeft";
import NowOverHereRight from "./Gestures/NowOverHereRight";
import WhoopItUp from "./Gestures/WhoopItUp";
import DownInFront from "./Gestures/DownInFront";
import ToTheLeft from "./Gestures/ToTheLeft";
import ToTheRight from "./Gestures/ToTheRight";

const Gestures = ({
  setAddHype1,
  setAddHype2,
  setAddHype3,
  gameOver,
  updatePlayScore,
  startDelayMin = 11000,
  startDelayMax = 15000,
  betweenDelayMin = 12000,
  betweenDelayMax = 20000,
}) => {
  const [canDoGesture, setCanDoGesture] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [gestureOpacity, setGestureOpacity] = useState(1);
  const [currentGesture, setCurrentGesture] = useState(null);
  const timeOutRef = useRef(null);

  const fadeTime = 8000;
  const hypeBonusTime = 2000;

  const getRanNum = (min, max) => Math.floor(
    Math.random() * (max - min + 1)
  ) + min;

  useEffect(() => {
    //timer before first gesture
    const ranGestureTime = getRanNum(startDelayMin, startDelayMax);
    setTimeout(() => {
      setCanDoGesture(true);
    }, ranGestureTime)
  }, [])

  useEffect(() => {
    if (gameOver) {
      setCurrentGesture(null);
    }
  }, [gameOver])

  useEffect(() => {
    if (canDoGesture && !gameOver) {
      setCanDoGesture(false);
      setCurrentGesture(getRanNum(1, 6)); //gets random gesture
      setGestureOpacity(1);
      setFadingOut(false);
      startTimer();
    }
  }, [canDoGesture])

  useFrame(() => {
    if (fadingOut) {
      //fades out gesture and resets
      const randomTimeout = getRanNum(betweenDelayMin, betweenDelayMax);
      setGestureOpacity((prev) => {
        if (prev > 0) {
          return Math.max(prev - 0.01, 0);
        } else {
          setTimeout(() => {
            setCanDoGesture(true);
          }, randomTimeout);
          setFadingOut(false);
          setCurrentGesture(null);
          setTimeout(() => {
            setAddHype1(false);
            setAddHype2(false);
            setAddHype3(false);
          }, hypeBonusTime)
          return 0;
        }
      });
    }
  })

  const startTimer = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      setFadingOut(true);
    }, fadeTime);
  };

  //randomizes gesture
  const displayGesture = () => {
    switch (currentGesture) {
      case 1:
      return (
        <NowOverHereLeft 
          setAddHype1={setAddHype1}
          updatePlayScore={updatePlayScore}
          gestureOpacity={gestureOpacity}
        />
      );
    case 2:
      return ( 
        <NowOverHereRight
          setAddHype3={setAddHype3}
          updatePlayScore={updatePlayScore}
          gestureOpacity={gestureOpacity}
        />
      );
    case 3:
      return (
        <WhoopItUp 
          setAddHype2={setAddHype2}
          updatePlayScore={updatePlayScore}
          gestureOpacity={gestureOpacity}
        />
      );
    case 4:
      return (
        <DownInFront
          setAddHype2={setAddHype2}
          updatePlayScore={updatePlayScore}
          gestureOpacity={gestureOpacity}
        />
      );
    case 5:
      return (
        <ToTheLeft 
          setAddHype1={setAddHype1}
          updatePlayScore={updatePlayScore}
          gestureOpacity={gestureOpacity}
        />
      );
      case 6:
        return (
          <ToTheRight
            setAddHype3={setAddHype3}
            updatePlayScore={updatePlayScore}
            gestureOpacity={gestureOpacity}
          />
        );
    default:
      return null;
    }
  }

  return (
    <>
      {displayGesture()}
    </>
  )
}

export default Gestures;