import React from "react";
import { Plane } from "@react-three/drei";
import * as THREE from "three";

const Background = () => {
  return (
    <>
      <Plane args={[25, 16]} position={[0, 3, -3]}>
        <meshStandardMaterial
          attach="material"
          color="#000"
          side={THREE.DoubleSide}
        />
      </Plane>

      <mesh position={[0, 3, -3]} rotation={[0, Math.PI * 1.5, 0]}>
        <cylinderGeometry args={[12.5, 12.5, 16, 32, 1, false, 0, Math.PI]} />
        <meshStandardMaterial 
          color="#000"
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default Background;