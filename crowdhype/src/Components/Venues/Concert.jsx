import { SpotLight } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { FBXLoader } from "three-stdlib";
import * as THREE from "three";

const ConcertModel = () => {
  const spotlight1Ref = useRef();
  const spotlight2Ref = useRef();
  const spotlight3Ref = useRef();
  const spotlight4Ref = useRef();
  const concertTexture = useLoader(FBXLoader,
    `${import.meta.env.BASE_URL}Textures/SM_ConcertVenue.fbx`
  )

  const setSpotlightTarget = (spotlightRef, position) => {
    if (spotlightRef.current) {
      spotlightRef.current.target.position.set(
        position[0],
        position[1],
        position[2],
      );
    }
  };

  useEffect(() => {
    setSpotlightTarget(spotlight1Ref, [0, 7, -4.8]); // Position for spotlight 1
    setSpotlightTarget(spotlight2Ref, [0, 7, -4.8]); 
    setSpotlightTarget(spotlight3Ref, [-8, 6, -4.8]); 
    setSpotlightTarget(spotlight4Ref, [8, 6, -4.8]); 
  }, []);

  return (
    <>
      <primitive
        position={[0, -0.5, 0]}
        object={concertTexture}
        scale={[0.015, 0.015, 0.015]}
        rotation={[0, Math.PI * 1.5, 0]}
      />

      <ambientLight intensity={3} />
      <SpotLight
        ref={spotlight1Ref}
        intensity={10}
        angle={1.2}
        penumbra={0.9}
        position={[-5.4, 5, 2.1]}
        distance={1000}
      />
      <SpotLight
        ref={spotlight2Ref}
        intensity={10}
        angle={1.2}
        penumbra={0.9}
        position={[5.4, 5, 2.1]}
        distance={1000}
      />
      <SpotLight
        ref={spotlight3Ref}
        intensity={10}
        angle={1.2}
        penumbra={0.9}
        position={[-5.4, 5, 2.1]}
        distance={1000}
      />
      <SpotLight
        ref={spotlight4Ref}
        intensity={10}
        angle={1.2}
        penumbra={0.9}
        position={[5.4, 5, 2.1]}
        distance={1000}
      />
      <directionalLight position={[-50, 20, -10]} intensity={0.02} />

      {/* Sky box */}
      <mesh >
        <boxGeometry args={[500, 500, 500]}/>
        <meshStandardMaterial 
          color={"#1a1a23"}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export default ConcertModel;