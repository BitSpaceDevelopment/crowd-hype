import "./App.css";
import GameCore from "./Components/GameCore";
import XRProvider from "./XRProvider";
import GameCoreProvider from "./Context/GameCoreContext";

const App = () => {
  return (
    <>
      <XRProvider>
        <GameCoreProvider>
          <GameCore />
        </GameCoreProvider>
      </XRProvider>
    </>
  );
};

export default App;
