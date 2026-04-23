import React, { Suspense, useEffect, useRef, useState } from "react";
import { SpotLight, Text } from "@react-three/drei";
import NameInput from "./NameInput";
import { MeshStandardMaterial } from "three";
import { FBXLoader } from "three-stdlib";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

const CakeModel = ({ position }) => {
  const fbx = useLoader(FBXLoader, "/Textures/SM_Cake.fbx");
  const texture = useLoader(
    THREE.TextureLoader,
    "/Textures/T_Cake_AlbedoTransparency.png",
  );

  useEffect(() => {
    // Apply the texture to the model's material
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture;
        child.material.needsUpdate = true;
      }
    });
  }, [fbx, texture]);

  return (
    <primitive
      object={fbx}
      position={position}
      scale={[0.02, 0.02, 0.02]}
      rotation={[0.5, 0.9, -0.4]}
    />
  );
};

const HighScoreInput = ({ nameLetters, setNameLetters, emissiveWhite }) => {
  const [color, setColor] = useState("hsl(0, 100%, 50%)");
  const spotKake = useRef();
  const cycleDuration = 3;

  // Function to set the target of each spotlight
  const setSpotlightTarget = (spotKake, position) => {
    if (spotKake.current) {
      spotKake.current.target.position.set(
        position[0],
        position[1],
        position[2],
      );
    }
  };

  // UseFrame for changing the color of "New HighScore!"
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    const hue = (elapsedTime / cycleDuration) * 360 % 360; 
    const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`);
    setColor(color);
  });

  const emissiveScore = new MeshStandardMaterial({
    emissive: "#000",
    emissiveIntensity: 10,
  });

  const handleLetterChange = (index) => (letter) => {
    setNameLetters((prev) => {
      const newLetters = [...prev];
      newLetters[index] = letter;
      return newLetters;
    });
  };

  useEffect(() => {
    setSpotlightTarget(spotKake, [-1.5, 0.5, -1]);
    const playerName = nameLetters.join("");
  }, [nameLetters]);

  const transparentMaterial = new MeshStandardMaterial({
    transparent: true,
    opacity: 1,
  });

  return (
    <>
      <Text
        position={[0, 1.4, -2.7]}
        fontSize={0.2}
        material={transparentMaterial && emissiveScore}
        color={color}
      >
        New High Score!
      </Text>
      <Text
        position={[0, 1.2, -2.7]}
        fontSize={0.15}
        material={transparentMaterial && emissiveWhite}
      >
        enter your name
      </Text>

      {/* A mesh for one letter selector (left) */}
      <mesh position={[-0.4, 0.7, -2.7]} material={transparentMaterial}>
        <NameInput onLetterChange={handleLetterChange(0)} />
      </mesh>

      {/* A mesh for one letter selector (middle) */}
      <mesh position={[0, 0.7, -2.7]} material={transparentMaterial}>
        <NameInput onLetterChange={handleLetterChange(1)} />
      </mesh>

      {/* A mesh for one letter selector (right) */}
      <mesh position={[0.4, 0.7, -2.7]} material={transparentMaterial}>
        <NameInput onLetterChange={handleLetterChange(2)} />
      </mesh>

      <SpotLight
        ref={spotKake}
        intensity={275}
        angle={0.1}
        penumbra={0.9}
        position={[5, 10, 0]}
        distance={100}
      />

      <Suspense fallback={null}>
        <CakeModel position={[-1.5, 0.5, -1]} />
      </Suspense>
    </>
  );
};

export default HighScoreInput;
