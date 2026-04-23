import { Sparkles } from "@react-three/drei";
import React from "react";
import * as THREE from "three";

const StageDeco = () => {
  const stageRing = new THREE.TextureLoader().load("/Textures/metalFloor.jpg");

  return (
    <>
      {/* Circle that the player stands/spawns on */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0001, 0]}>
        <circleGeometry args={[0.5, 64]} />
        <meshStandardMaterial map={stageRing} color="#fff" />
      </mesh>

      {/* first ring around the player */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0001, 0]}>
        <torusGeometry args={[0.6, 0.04, 2, 360]} />
        <meshStandardMaterial map={stageRing} color="#fff" />
      </mesh>

      {/* second ring around the player */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0001, 0]}>
        <torusGeometry args={[1.1, 0.05, 2, 360]} />
        <meshStandardMaterial map={stageRing} color="#fff" />
      </mesh>

      {/* third ring around the player */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.0001, 0]}>
        <torusGeometry args={[1.3, 0.08, 2, 360]} />
        <meshStandardMaterial map={stageRing} color="#fff" />
      </mesh>

      {/* SPARKLES */}
      <mesh position={[0, 2, -5]}>
        <Sparkles color="white" count={75} scale={10} size={3} speed={0.4} />
      </mesh>
    </>
  );
};

export default StageDeco;
