import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import * as THREE from "three";

const StadiumModel = () => {
  const stadiumTexture = useLoader(FBXLoader,
    `${import.meta.env.BASE_URL}Textures/SM_Stadium_NoLightBeams.fbx`
  )

  return (
    <>
      <ambientLight intensity={3} />

      <primitive
        position={[0, -0.5, 0]}
        object={stadiumTexture}
        scale={[0.015, 0.015, 0.015]}
        rotation={[0, Math.PI * 1.5, 0]}
      />

      {/* Sky box */}
      <mesh >
        <boxGeometry args={[500, 500, 500]}/>
        <meshStandardMaterial 
          color={"#333"}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
    
  );
}

export default StadiumModel;