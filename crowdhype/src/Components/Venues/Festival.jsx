import { useLoader } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import { Sky } from "@react-three/drei";

const FestivalModel = () => {
  const concertTexture = useLoader (FBXLoader, 
    "/Textures/SM_ConcertVenue.fbx"
  )  

  return (
    <>
      <primitive
        position={[0, -0.5, 0]}
        object={concertTexture}
        scale={[0.015, 0.015, 0.015]}
        rotation={[0, Math.PI * 1.5, 0]}
      />
      <Sky 
        distance={4500} 
        sunPosition={[1, 0.3, 2]} 
        rayleigh={0.3}
        mieCoefficient={0.01}
        mieDirectionalG={0.7}
      />
      <ambientLight intensity={5} />
      <directionalLight position={[50, 10, 100]} intensity={0.2} />
    </>
  );
}

export default FestivalModel;