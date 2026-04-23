import React, { useState, useEffect, useMemo } from "react";
import { Text } from "@react-three/drei";
import { Interactive } from "@react-three/xr";
import { MeshStandardMaterial, MeshBasicMaterial } from "three";
import ButtonSound from "./Sounds/ButtonSound";

const NameInput = ({ onLetterChange }) => {
  const [index, setIndex] = useState(0);
  const [hovered1, setHovered1] = useState(false);
  const [hovered2, setHovered2] = useState(false);

  const playButtonSound = ButtonSound();

  // Array of letters for name selection
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const letter = letters[index];
    if (onLetterChange) {
      onLetterChange(letter);
    }
  }, [index, onLetterChange]);

  // Const for handling next letter (A -> B)
  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % 26);
  };

  // Const for handing previous letter (A <- B)
  const handlePrevious = () => {
    setIndex((prevIndex) => (prevIndex - 1 + 26) % 26);
  };

  // Color and hover effect for arrows
  const transparentMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        transparent: true,
        opacity: 1,
        // emissive: "#04d9fc",
        // emissiveIntensity: 10
      }),
    [],
  );

  const emissiveLetter = new MeshStandardMaterial({
    emissive: "#00eaff",
    emissiveIntensity: 1,
  });

  const basicMaterialHovered1 = useMemo(
    () =>
      new MeshBasicMaterial({
        color: hovered1 ? "#68725e" : "#fff",
      }),
    [hovered1],
  );

  const basicMaterialHovered2 = useMemo(
    () =>
      new MeshBasicMaterial({
        color: hovered2 ? "#68725e" : "#fff",
      }),
    [hovered2],
  );

  return (
    <>
      {/* Cone geometry to make it look like an arrow ( /\ ) */}
      <Interactive
        onHover={() => setHovered1(true)}
        onBlur={() => setHovered1(false)}
        onSelectStart={playButtonSound}
        onSelect={handlePrevious}
      >
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.2, 0]}
          material={transparentMaterial}
        >
          <coneGeometry args={[0.1, 0.01, 3]} />
          <primitive object={basicMaterialHovered1} />
        </mesh>
      </Interactive>

      {/* Text to display the current letter selected */}
      <Text
        fontSize={0.2}
        color="#000"
        material={transparentMaterial && emissiveLetter}
      >
        {letters[index]}
      </Text>

      {/* Cone geometry to make it look like an arrow  ( \/ )*/}
      <Interactive
        onHover={() => setHovered2(true)}
        onBlur={() => setHovered2(false)}
        onSelectStart={playButtonSound}
        onSelect={handleNext}
      >
        <mesh
          rotation={[-Math.PI / 2, -Math.PI / 1, 0]}
          position={[0, -0.2, 0]}
          material={transparentMaterial}
        >
          <coneGeometry args={[0.1, 0.01, 3]} />
          <primitive object={basicMaterialHovered2} />
        </mesh>
      </Interactive>
    </>
  );
};

export default NameInput;
