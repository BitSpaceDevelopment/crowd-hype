import React from "react";
import { XR, VRButton } from "@react-three/xr";
import { Canvas } from "@react-three/fiber";

const BASE = import.meta.env.BASE_URL;

const XRProvider = ({ children }) => {
  return (
    <>
      {/* BSD XR logo overlay */}
      <div className="bsd-logo-overlay">
        <img src={`${BASE}Textures/logo-dark.png`} alt="BSD XR" />
      </div>

      {/* Desktop hint */}
      <div className="bsd-desktop-hint">
        Click to interact &nbsp;·&nbsp; VR headset optional
      </div>

      <VRButton />
      <Canvas>
        <XR>{children}</XR>
      </Canvas>
    </>
  );
};

export default XRProvider;
