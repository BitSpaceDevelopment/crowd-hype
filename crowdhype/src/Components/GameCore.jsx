import { OrbitControls } from "@react-three/drei";
import { Controllers } from "@react-three/xr";
import MainMenu from "../Scenes/MainMenu";
import { RefsProvider } from "./RefsProvider";
import ScoresMenu from "../Scenes/ScoresMenu";
import Credits from "../Scenes/Credits";
import ModeSelect from "../Scenes/ModeSelect";
import Warning from "../Scenes/Warning";
import Background from "./Background";
import BackgroundMenu from "./BackgroundMenu";
import VenueSelect from "../Scenes/VenueSelect";
import Venue from "./Venue";
import ConsoleLogs from "./ConsoleLogs";
import { useGameCore }  from "../Context/GameCoreContext"
import SongSelect from "../Scenes/SongSelect";
import Tutorial from "../Scenes/Tutorial/Tutorial";

/*
  GameCore is the main hub for the game, it is the highest level component
  all components are stated here or in a component stated here
  
  RenderScene: loads the current scene, scenes need to receive setCurrentScene
  to navigate to other scenes

  RefsProvider: provides refs for textures/wraps everything
  ambientLight: ambient light for the game
  OrbitControls: adds orbit controller that allow 360 viewing in desktop mode
  MainStage: Component/main play area
  OverheadLights: Component/lighting for the game is here
  Controllers: establishes controllers and the ray color
*/

const GameCore = () => {
  const { currentScene } = useGameCore();
 
  const RenderScene = () => {
    switch (currentScene) {
      case "warning":
        return <>
          <Background/>
          <Warning/>
        </>;
      case "mainMenu":
        return <>
          <Background/>
          <MainMenu/>
        </>;
      case "modeSelect":
        return <>
          <Background/>
          <ModeSelect/>
        </>;
      case "songSelect":
        return <>
          <Background/>
          <SongSelect/>
        </>;
      case "scores":
        return <>
          <Background/>
          <ScoresMenu/>
        </>;
      case "credits":
        return <>
          <Background/>
          <Credits/>
        </>;
      case "startGame":
        return <>
          <BackgroundMenu/>
        </>
      case "venueSelect":
        return <>
          <Background/>
          <VenueSelect/>
        </>
      case "tutorial":
        return <>
          <Tutorial/>
        </>
      default:
        return <>
          <Background/>
          <MainMenu/>
        </>;
    }
  };

  return (
    <RefsProvider>
      {/*<ConsoleLogs/> For Testing*/}
      <OrbitControls />
      <Venue />
      {RenderScene()}
      <Controllers rayMaterial={{ color: "green" }} />
    </RefsProvider>
  );
};

export default GameCore;
