import { Plane, Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import { useGameCore }  from "../Context/GameCoreContext";
import { fadeIn, handleSceneChange } from "../Animations/MenuAnimations";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

const Warning = () => {
  const { setCurrentScene, playMenuMusic } = useGameCore();
  const [warningOpacity, setWarningOpacity] = useState(0);
  const [fadingIn, setFadingIn] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [newScene, setNewScene] = useState();

  useEffect(() => {
    setFadingIn(true);
  }, []);

  useFrame(() => {
    if (fadingIn){
      fadeIn(setWarningOpacity, setFadingIn)
    }
  })

  useFrame(() => {
    if (fadingOut) {
      handleSceneChange(
        newScene, setWarningOpacity, setCurrentScene, setFadingOut
      );
    }
  });

  const tryChangeScene = (newScene) => {
    if (warningOpacity === 1) {
      setNewScene(newScene)
      setFadingOut(true);
    }
  }

  return (
    <>
      <Interactive onSelect={() => {
          tryChangeScene("mainMenu")
          playMenuMusic();
        }}>
        <Plane args={[20, 10]} position={[0, 5, -2.5]}>
          <meshBasicMaterial
            color="#000"
            transparent={true}
            opacity={warningOpacity}
          />
          <Text
            fontSize={0.4}
            position={[0, -3, 0.001]}
            color="#ff0000"
            transparent={true}
            fillOpacity={warningOpacity}
          >
            WARNING
          </Text>
          <Text 
            fontSize={0.2} 
            position={[0, -3.5, 0.001]}
            transparent={true}
            fillOpacity={warningOpacity}
            >
            This game contains flashing lights
          </Text>
          <Text 
            fontSize={0.08} 
            position={[0, -3.7, 0.001]}
            transparent={true}
            fillOpacity={warningOpacity}
            >
            click anywhere to continue
          </Text>
        </Plane>
      </Interactive>
    </>
  )
}

export default Warning;