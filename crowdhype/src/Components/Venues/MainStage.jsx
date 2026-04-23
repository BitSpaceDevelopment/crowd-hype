import React from "react";
import { Plane } from "@react-three/drei";
import StageDeco from "../StageDeco";
import * as THREE from "three";
import OverheadLights from "../OverheadLights"

const MainStage = () => {
  const stageFloor = new THREE.TextureLoader().load(
    "/Textures/metalFloorLight.jpg",
  );
  return (
    <>
      <ambientLight intensity={2} />
      <OverheadLights />

      {/* Stage Floor */}
      <Plane
        args={[20, 5]}
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial map={stageFloor} color="#fff" />
      </Plane>

      {/* Stage Back Wall */}
      <Plane
        args={[11, 8]}
        position={[0, 3, 2.5]}
        rotation={[0, -Math.PI / 1, 0]}
      >
        <meshBasicMaterial
          attach="material"
          color="#707070"
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Stage Wall */}
      <Plane args={[9.5, 10]} position={[-6, 4.5, 0.75]} rotation={[0, 2.4, 0]}>
        <meshBasicMaterial
          attach="material"
          color="#666"
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Stage Wall */}
      <Plane args={[9.5, 10]} position={[6, 4.5, 0.75]} rotation={[0, -2.4, 0]}>
        <meshBasicMaterial
          attach="material"
          color="#666"
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Stage Roof Back*/}
      <Plane
        args={[20, 12]}
        position={[0, 9, -2]}
        rotation={[-Math.PI / 2.8, 0, 0]}
      >
        <meshBasicMaterial
          attach="material"
          color="#333"
          side={THREE.DoubleSide}
        />
      </Plane>

      {/* Stage Decorations */}
      <StageDeco />

      {/* Sky box */}
      <mesh >
        <boxGeometry args={[500, 500, 500]}/>
        <meshStandardMaterial 
          color={"#111"}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
};

export default MainStage;
