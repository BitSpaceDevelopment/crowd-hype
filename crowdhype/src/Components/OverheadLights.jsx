import React, { useEffect, useRef } from "react";
import { SpotLight } from "@react-three/drei";

const OverheadLights = () => {
  const spotlight1Ref = useRef();
  const spotlight2Ref = useRef();
  const spotlight3Ref = useRef();
  const spotlight4Ref = useRef();
  const spotlight5Ref = useRef();
  const lightLvl = 10;

  // Function to set the target of each spotlight
  const setSpotlightTarget = (spotlightRef, position) => {
    if (spotlightRef.current) {
      spotlightRef.current.target.position.set(
        position[0],
        position[1],
        position[2],
      );
    }
  };

  // Use useEffect to set initial spotlight targets on mount
  useEffect(() => {
    setSpotlightTarget(spotlight1Ref, [-3.3, 1, -4.8]); // Position for spotlight 1
    setSpotlightTarget(spotlight2Ref, [0, 1, -5.8]); // Position for spotlight 2
    setSpotlightTarget(spotlight3Ref, [3.3, 1, -4.8]); // Position for spotlight 3...
    setSpotlightTarget(spotlight4Ref, [0, 0, -1]);
    setSpotlightTarget(spotlight5Ref, [0, 1, -5.8]);
  }, []);

  return (
    <>
      {/* ====== CROWD LIGHTS ====== */}
      <SpotLight
        ref={spotlight1Ref}
        intensity={lightLvl}
        angle={0.1}
        penumbra={0.9}
        position={[0, 5, -3]}
        distance={100}
      />

      <SpotLight
        ref={spotlight5Ref}
        intensity={lightLvl}
        angle={0.1}
        penumbra={0.9}
        position={[2, 5, -3]}
        distance={100}
      />

      <SpotLight
        ref={spotlight2Ref}
        intensity={lightLvl}
        angle={0.1}
        penumbra={0.9}
        position={[-2, 5, -3]}
        distance={100}
      />

      <SpotLight
        ref={spotlight3Ref}
        intensity={lightLvl}
        angle={0.1}
        penumbra={0.9}
        position={[0, 5, -3]}
        distance={100}
      />

      {/*====== STAGE LIGHTS ======*/}

      <SpotLight
        ref={spotlight4Ref}
        intensity={lightLvl}
        angle={0.1}
        penumbra={0.9}
        position={[-3.5, 5, -3]}
        distance={9}
      />

      <SpotLight
        ref={spotlight4Ref}
        intensity={lightLvl}
        angle={0.1}
        penumbra={0.9}
        position={[3.5, 5, -3]}
        distance={9}
      />

      <SpotLight
        ref={spotlight4Ref}
        intensity={lightLvl}
        angle={0.3}
        penumbra={0.9}
        position={[0, 5, -3.1]}
        distance={9}
      />
    </>
  );
};

export default OverheadLights;
