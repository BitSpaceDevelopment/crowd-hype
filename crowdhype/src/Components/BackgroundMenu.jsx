import React, { useState } from "react";
import CrowdTarget from "./CrowdTarget";

const BackgroundMenu = () => {
  const [backGroundOpacity, setBackGroundOpacity] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [multiplier, setMultiplier] = useState(0);

  return (
    <>
      <CrowdTarget
        playerScore={playerScore}
        setPlayerScore={setPlayerScore}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
        backGroundOpacity={backGroundOpacity}
        setBackGroundOpacity={setBackGroundOpacity}
      />
    </>
  );
};

export default BackgroundMenu;
