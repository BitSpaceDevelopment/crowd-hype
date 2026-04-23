import { Interactive } from "@react-three/xr";

/*
  GameInteractive wraps @react-three/xr Interactive so the game works
  both in VR (XR controller events) and on desktop (mouse pointer events).

  XR events:   onSelect, onSelectStart, onHover, onBlur, onSqueezeStart
  Desktop:     onClick → onSelect
               onPointerDown → onSelectStart
               onPointerOver → onHover
               onPointerOut  → onBlur
*/

const GameInteractive = ({
  onSelect,
  onSelectStart,
  onHover,
  onBlur,
  onSqueezeStart,
  children,
}) => {
  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    onHover?.();
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
    onBlur?.();
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
        onPointerDown={onSelectStart}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {children}
      </group>
    </Interactive>
  );
};

export default GameInteractive;
