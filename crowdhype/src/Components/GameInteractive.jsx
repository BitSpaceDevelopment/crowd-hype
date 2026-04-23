import { Interactive } from "@react-three/xr";
import { useRef } from "react";

/*
  GameInteractive wraps @react-three/xr Interactive so the game works
  both in VR (XR controller events) and on desktop (mouse pointer events).

  XR events:   onSelect, onSelectStart, onHover, onBlur, onSqueezeStart
  Desktop:     onClick        → onSelect
               onPointerDown  → onSelectStart + onHover (click-and-hold = hype)
               onPointerUp    → onBlur only if pointer left the mesh
               onPointerOver  → onHover
               onPointerOut   → onBlur
*/

const GameInteractive = ({
  onSelect,
  onSelectStart,
  onHover,
  onBlur,
  onSqueezeStart,
  children,
}) => {
  const isOver = useRef(false);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    isOver.current = true;
    document.body.style.cursor = "pointer";
    onHover?.();
  };

  const handlePointerOut = () => {
    isOver.current = false;
    document.body.style.cursor = "default";
    onBlur?.();
  };

  // Click-and-hold triggers onHover so crowd hyping works on desktop
  // (equivalent to aim-and-hold with a VR controller)
  const handlePointerDown = () => {
    onSelectStart?.();
    onHover?.();
  };

  // Only stop the hype if the pointer has already left the mesh
  const handlePointerUp = () => {
    if (!isOver.current) {
      onBlur?.();
    }
  };

  return (
    <Interactive
      onSelect={onSelect}
      onSelectStart={onSelectStart}
      onHover={onHover}
      onBlur={onBlur}
      onSqueezeStart={onSqueezeStart}
    >
      <group
        onClick={onSelect}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {children}
      </group>
    </Interactive>
  );
};

export default GameInteractive;
