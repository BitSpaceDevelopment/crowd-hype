import { SpotLight } from "@react-three/drei";
import React from "react";
import * as THREE from "three";

const LightFixture = () => {
  const points = [];
  for (let i = 0; i < 3; i++) {
    points.push(
      new THREE.Vector2(Math.sin(i * 0.2) * 0.4 + 0.09, (i - 5) * 0.1),
    );
  }

  return (
    <>
      {/* Lathe geometry to make a light shade */}
      <mesh position={[0, 4.6, 0]} rotation={[0, 0, -Math.PI / 1]}>
        <latheGeometry args={[points, 9, 0, Math.PI * 2]} />
        <meshStandardMaterial color="#333" side={THREE.DoubleSide} />
      </mesh>
      <SpotLight
        intensity={10}
        angle={0.5}
        penumbra={0.9}
        position={[0, 5, 0]}
      />
    </>
  );
};

export default LightFixture;
