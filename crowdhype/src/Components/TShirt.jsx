import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import GameInteractive from "./GameInteractive";
import { forwardRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const TShirt = forwardRef((props, ref) => {
  const { camera } = useThree();
  const gltf = useGLTF(`${import.meta.env.BASE_URL}Textures/SM_FoldedShirt_1.glb`);
  const getRanNum = (min, max) => Math.random() * (max - min) + min;
  const { tShirtId, deleteTShirt } = props

  const startPosition = useRef(
    new THREE.Vector3(
      camera.position.x + getRanNum(-0.2, 0.2),
      -1,
      camera.position.z - 1
    )
  );

  const startRotation = useRef(new THREE.Euler(0, 0, 0));
  const [currentPosition, setCurrentPosition] = useState(startPosition.current);
  const [currentRotation, setCurrentRotation] = useState(startRotation.current);
  const [direction, setDirection] = useState(new THREE.Vector3(0, 0, 0));
  const [isHeld, setIsHeld] = useState(false);
  const [beenGrabbed, setBeenGrabbed] = useState(false);
  const [tShirtOpacity, setTShirtOpacity] = useState(1);
  const [fadingOut, setFadingOut] = useState(false);
  const holdingController = useRef(null);
  const timerRef = useRef(null);
  const gravity = new THREE.Vector3(0, -0.007, 0);
  const speed = 0.1;
  const clonedScene = useRef(null);
  const fadeOutTime = 10000;
  const throwHeight = 0.25

  //starts timeout to delete t-shirt
  useEffect(() => {
    startTimer();
  }, []);

  //makes model transparent
  useEffect(() => {
    clonedScene.current = gltf.scene.clone(true);
    clonedScene.current.traverse((child) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = tShirtOpacity;
      }
    });
  }, [gltf.scene]);

  //updates opacity
  useEffect(() => {
    if (clonedScene.current) {
      clonedScene.current.traverse((child) => {
        if (child.isMesh) {
          child.material.opacity = tShirtOpacity;
        }
      });
    }
  }, [tShirtOpacity]);

  useFrame(() => {
    if (isHeld && holdingController.current) {
      handleHolding();
    } else if (beenGrabbed) {
      throwAnimation();
    } else {
      spawnAnimation();
    }

    if (currentPosition.y < -2) {
      deleteTShirt(tShirtId);
    }

    //fade out
    if (fadingOut) {
      setTShirtOpacity((prev) => {
        if (prev > 0) {
          return Math.max(prev - 0.05, 0);
        } else {
          setFadingOut(false);
          deleteTShirt(tShirtId);
          return 0;
        }
      });
    }
  });

  //timer for fade out and delete
  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setFadingOut(true);
    }, fadeOutTime);
  };

  const handleHolding = () => {
    const { controller, inputSource } = holdingController.current;
    const controllerPosition = controller.position;
    const controllerQuaternion = controller.quaternion;

    const offset = new THREE.Vector3(0, 0, -0.06);
    offset.applyQuaternion(controllerQuaternion);

    const newPosition = new THREE.Vector3().copy(controllerPosition).add(offset);

    const newDirection = new THREE.Vector3()
      .subVectors(newPosition, currentPosition)
      .normalize();

    setDirection(
      new THREE.Vector3(
        newDirection.x / 1.1, throwHeight, newDirection.z
      )
    );

    setCurrentPosition(newPosition);
    setCurrentRotation(
      new THREE.Euler().setFromQuaternion(controllerQuaternion)
    );

    if (!inputSource.gamepad.buttons.some((button) => button.pressed)) {
      handleStopGrab();
    }
  };

  const throwAnimation = () => {
    setCurrentPosition((prev) => prev.clone().addScaledVector(direction, speed));

    setDirection((prev) => prev.clone().add(gravity));

    setCurrentRotation((prev) => {
      const newRotation = prev.clone();
      newRotation.x -= 0.03;
      return newRotation;
    });
  };

  const spawnAnimation = () => {
    if (currentPosition.y < 1.3) {
      setCurrentPosition((prev) => {
        const newPosition = new THREE.Vector3(prev.x, prev.y + 0.05, prev.z);
        return newPosition;
      });
    } else {
      setCurrentRotation((prev) => {
        const newRotation = prev.clone();
        newRotation.y -= 0.01;
        return newRotation;
      });
    }
  };

  const handleGrab = (e) => {
    if (!beenGrabbed){
      const controller = e.target;
      setIsHeld(true);
      setBeenGrabbed(true);
      startTimer();
      holdingController.current = controller;
    }
  };

  const handleStopGrab = () => {
    startTimer();
    setIsHeld(false);
    holdingController.current = null;
  };

  return (
    <>
      <GameInteractive 
        ref={ref} 
        onSelectStart={(e) => handleGrab(e)}
        onSqueezeStart={(e) => handleGrab(e)}
      >
        {clonedScene.current && (
          <primitive
            object={clonedScene.current}
            position={currentPosition}
            rotation={currentRotation}
            scale={[1.5, 1.5, 1.5]}
            depthWrite={false}
            depthTest={true}
          />
        )}
      </GameInteractive>
    </>
  );
});

export default TShirt;
