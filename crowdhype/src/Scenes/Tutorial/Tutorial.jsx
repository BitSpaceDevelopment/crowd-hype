import { useEffect, useState } from "react";
import Goal from "./Goal";
import { Interactive } from "@react-three/xr";
import { RoundedBox, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { fadeIn, handleSceneChange } from "../../Animations/MenuAnimations";
import ButtonSound from "../../Components/Sounds/ButtonSound";
import { useGameCore } from "../../Context/GameCoreContext";
import TShirtTutorial from "./TShirtTutorial";
import TomatoTutorial from "./TomatoTutorial";
import GesturesTutorial from "./GesturesTutorial";
import GameOverTutorial from "./GameOverTutorial";

const Tutorial = () => {
  const [currentTutorial, setCurrentTutorial] = useState(1);
  const [newTutorial, setNewTutorial] = useState(1);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOutScene, setFadingOutScene] = useState(false);
  const [fadingOutTutorial, setFadingOutTutorial] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [hoverBack, setHoverBack] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const { setCurrentScene } = useGameCore();
  const numTutorial = 5;

  const playButtonSound = ButtonSound();
  const fontSize = 0.15;
  const ZLocation = -2.7;

  useEffect(() => {
    setFadingIn(true);
  }, []);

  useEffect(() => {
    if (opacity === 0 && currentTutorial > 0) {
      setFadingIn(true);
    }
  }, [currentTutorial])

  useFrame(() => {
    if (fadingIn){
      fadeIn(setOpacity, setFadingIn);
    }
  })

  useFrame(() => {
    if (fadingOutTutorial) {
      handleSceneChange(
        newTutorial, setOpacity, setCurrentTutorial, setFadingOutTutorial
      );
    }
    if (fadingOutScene) {
      handleSceneChange(
        "mainMenu", setOpacity, setCurrentScene, setFadingOutScene
      );
    }
  });

  const tryChangeTutorial = (newTutorial) => {
    if (opacity === 1) {
      setNewTutorial(newTutorial);
      if (newTutorial > 0 && newTutorial <= numTutorial) {
        setFadingOutTutorial(true);
      } else if (newTutorial <= 1 || newTutorial > numTutorial) {
        setFadingOutScene(true);
      }
    }
  }

  const handleBack = () => {
    tryChangeTutorial(currentTutorial - 1)
  }

  const handleNext = () => {
    tryChangeTutorial(currentTutorial + 1);
  }

  const RenderScene = () => {
    switch (currentTutorial) {
      case 0:
        return null;
      case 1:
        return <Goal opacity={opacity}/>
      case 2:
        return <GameOverTutorial opacity={opacity} />
      case 3:
        return <TShirtTutorial opacity={opacity}/>
      case 4:
        return <TomatoTutorial opacity={opacity}/>
      case 5:
        return <GesturesTutorial opacity={opacity} />
      default:
        return null;
    }
  };

  return (
    <>
      {RenderScene()}
      {/*Back*/}
      <Interactive
        onHover={() => setHoverBack(true)}
        onBlur={() => setHoverBack(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {
          handleBack()
        }}
      >
        <mesh position={[-0.5, 0.3, ZLocation]}>
          <RoundedBox
            args={[0.9, 0.2, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={hoverBack ? "#777" : "#666"}
              transparent={true}
              opacity={opacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
            transparent={true}
            fillOpacity={opacity}
          >
            BACK
          </Text>
        </mesh>
      </Interactive>

      {/*Next*/}
      <Interactive
        onHover={() => setHoverNext(true)}
        onBlur={() => setHoverNext(false)}
        onSelectStart={playButtonSound}
        onSelect={() => {handleNext()}}
      >
        <mesh position={[0.5, 0.3, ZLocation]}>
          <RoundedBox
            args={[0.9, 0.2, 0.1]}
            radius={0.1}
            smoothness={16}
            bevelSegments={0}
            creaseAngle={2}
          >
            <meshBasicMaterial
              color={hoverNext ? "#777" : "#666"}
              transparent={true}
              opacity={opacity}
            />
          </RoundedBox>
          <Text
            position={[0, 0, 0]}
            fontSize={fontSize}
            transparent={true}
            fillOpacity={opacity}
          >
            {currentTutorial === numTutorial ? "HOME" : "NEXT"}
          </Text>
        </mesh>
      </Interactive>
    </>
  )
}

export default Tutorial;