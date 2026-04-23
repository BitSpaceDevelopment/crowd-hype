import { useGameCore }  from "../Context/GameCoreContext"
import LightFixture from "./LightFixture";
import ConcertModel from "./Venues/Concert";
import FestivalModel from "./Venues/Festival";
import MainStage from "./Venues/MainStage";
import StadiumModel from "./Venues/Stadium";

const Venue = () => {
  const { selectedVenue } = useGameCore();

  const renderVenue = () => {
    switch (selectedVenue) {
      case "mainStage":
        return <>
          <MainStage />
        </>
      case "concert":
        return <>
          <ConcertModel />
        </>
      case "game":
        return <>
          <StadiumModel />
        </> 
      case "festival":
        return <>
          <FestivalModel />
        </>
      default:
        return <>
          <MainStage />
        </>
    }
  }

  return (
    <>
      <LightFixture />
      {renderVenue()}
    </>
  )
}

export default Venue