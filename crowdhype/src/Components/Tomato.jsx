import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState } from "react";

const Tomato = ({
  tomatoId,
  targetX,
  targetY, 
  targetZ,
  startX,
  startY,
  startZ,
  hitPlayer, 
  hitGround,
  playerPosition,
}) => {
  const {scene} = useGLTF(`${import.meta.env.BASE_URL}Textures/SM_Tomato_1.glb`);
  const getRanNum = (min, max) => Math.random() * (max - min) + min;

  const gravity = new THREE.Vector3(0, -0.005, 0);
  const collisionSize = 0.2;
  const baseHeight = 0.9;

  //change speed based on how far player is
  const speed = useRef(0.07 + (targetZ / 100));

  //random rotation
  const ranRotation = useRef(new THREE.Euler(
    getRanNum(0, 6), getRanNum(0, 6), getRanNum(0, 6)
  ));

  //position of crowd to start
  const startPosition = useRef(new THREE.Vector3(
    startX + getRanNum(-1, 1), startY, startZ + 0.5
  ));

  const [currentPosition, setCurrentPosition] = useState(startPosition.current);
  const [currentRotation, setCurrentRotation] = useState(ranRotation.current);

  //set target based on player position with some randomness
  const targetPosition = useRef(new THREE.Vector3(
    targetX + getRanNum(-0.1, 0.1), 
    targetY + baseHeight + (targetY / 3), //height of throw
    targetZ
  ));

  const [direction, setDirection] = useState(new THREE.Vector3()
    .subVectors(targetPosition.current, startPosition.current)
    .normalize()
  );

  useFrame(() => {
    setCurrentPosition(
      (prev) => prev.clone().addScaledVector(direction, speed.current)
    )
    setCurrentRotation((prev) => {
      const newRotation = prev.clone()
      newRotation.x += 0.05
      return newRotation
    })

    setDirection((prev) => prev.clone().add(gravity));

    if (currentPosition.y < -2){
      hitGround(tomatoId);
    }

    const distance = currentPosition.distanceTo(playerPosition);
    if (distance < collisionSize){
      hitPlayer(tomatoId);
    }
  })

  return (
    <>
      <primitive
        object={scene.clone()}
        position={currentPosition.toArray()}
        scale={[0.5, 0.5, 0.5]}
        rotation={currentRotation}
        depthWrite={false}
        depthTest={true}
      />
    </>
  )
}

export default Tomato