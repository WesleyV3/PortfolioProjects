import { Graphics, Sprite, Text, useApp, useTick } from "@pixi/react";
import { useCallback, useState } from "react";
import Score from "../Score/Score";
import { getAbsoluteCenter } from "../helpers/Helpers";

export default function GameOver(props: any) {
  const gameSettings = props.gameSettings.current;
  const textBoxSettings = {
    x: gameSettings.canvasSettings.width / 2,
    y: gameSettings.canvasSettings.height / 2,
    width: 325,
    height: 100,
  };
  const textBoxAbsoluteCenter = getAbsoluteCenter(
    textBoxSettings.x,
    textBoxSettings.width,
    textBoxSettings.y,
    textBoxSettings.height
  );

  const [isRestartGame, setIsRestartGame] = useState(false);

  const draw = useCallback((g : any) => {
    g.clear();
    g.beginFill(0x212121, 0.5);
    g.drawRect(0, 0, 1000, 500);
    g.endFill();
  }, []);

  const drawButton = useCallback((g: any) => {
    g.clear();
    g.beginFill(0xffffff, 0.5);
    g.drawRoundedRect(
      textBoxAbsoluteCenter.x,
      textBoxAbsoluteCenter.y,
      textBoxSettings.width,
      textBoxSettings.height
    );
    g.endFill();
  }, [textBoxAbsoluteCenter.x, textBoxAbsoluteCenter.y, textBoxSettings.height, textBoxSettings.width]);

  useTick((deltaMs) => {
    if (props.gameSettings.current.restartGame == null) {
      props.gameSettings.current.restartGame = initiateRestart;
    }
    if (isRestartGame) {
      props.setIsLoading(true);
      props.gameSettings.current.gameOver = false;
      setIsRestartGame(false);
    }
  });

  function initiateRestart(e: KeyboardEvent) {
    setIsRestartGame(true);
    window.removeEventListener('keydown', initiateRestart);
  }

  function showGameOverScreen() {
    if (props.gameSettings.current.gameOver) {
      return (
        <>
          <Graphics draw={draw} />
          <Score gameSettings={props.gameSettings} />
          <Graphics
            draw={drawButton}
            click={() => {
              console.log("fire!");
            }}
          />
          <Text
            text="Game Over"
            x={textBoxAbsoluteCenter.x + textBoxSettings.width / 2 - 75}
            y={textBoxAbsoluteCenter.y}
          />
          <Text
            text="Press any button to restart"
            x={textBoxAbsoluteCenter.x + 10}
            y={textBoxAbsoluteCenter.y + 50}
          />
        </>
      );
    }
    return <></>;
  }

  return showGameOverScreen();
}
