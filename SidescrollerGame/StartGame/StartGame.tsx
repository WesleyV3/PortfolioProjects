import { Graphics, Text } from "@pixi/react";
import { useCallback, useRef } from "react";

let isInitialized = false;

export default function StartGame(props:any) {
  const backgroundSize = useRef({
    width: props.gameSettings.current.canvasSettings.width,
    height: props.gameSettings.current.canvasSettings.height / 3,
  });
  const background = useCallback((g:any) => {
    g.clear();
    g.beginFill(0xffffff, 0.5);
    g.drawRect(
      0,
      props.gameSettings.current.canvasSettings.height / 2 -
        backgroundSize.current.height / 2,
      backgroundSize.current.width,
      backgroundSize.current.height
    );
    g.endFill();
  }, [props.gameSettings]);

  function startGame(e:KeyboardEvent) {
    if (e.code === "Space") {
      props.gameSettings.current.speed = 3;
      window.removeEventListener("keydown", startGame);
    }
  }

  function initialize() {
    if (!isInitialized) {
      window.addEventListener("keydown", startGame);
      isInitialized = true;
    }
  }
  initialize();
  
  function showStartGameElement() {
    if (
      !props.gameSettings.current.gameOver &&
      props.gameSettings.current.speed == 0
    ) {
      return (
        <>
          <Graphics draw={background} />
          <Text
            text="Press spacebar to start the game"
            x={backgroundSize.current.width / 2 - 200}
            y={
              props.gameSettings.current.canvasSettings.height / 2 -
              backgroundSize.current.height / 5
            }
          />
        </>
      );
    }
  }

  return showStartGameElement();
}
