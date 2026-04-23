export const fadeIn = (setOpacity, setFading) => {
  //fade in animation
  setOpacity((prev) => {
    if (prev < 1) {
      return Math.min(prev + 0.05, 1);
    } else {
      setFading(false)
      return 1;
    }
  });
}

//fade out animation and setting next scene
export const handleSceneChange = (
  newScene, setOpacity, setCurrentScene, setFadingOut
) => {
  setOpacity((prev) => {
    if (prev > 0) {
      return Math.max(prev - 0.05, 0);
    } else {
      setCurrentScene(newScene);
      setFadingOut(false)
      return 0;
    }
  });
}
