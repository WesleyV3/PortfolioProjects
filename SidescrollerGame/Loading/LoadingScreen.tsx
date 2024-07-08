import { Graphics, Text, useTick } from "@pixi/react";
import { useCallback } from "react";
import Throbber from "../UIElements/Throbber";

export default function LoadingScreen(props: any) {
  const textBoxHeight = props.gameSettings.current.canvasSettings.height / 3;
  const LoadingScreen = useCallback(
    (g: any) => {
      g.clear();
      g.beginFill(0x000000, 1);
      g.drawRect(
        0,
        0,
        props.gameSettings.current.canvasSettings.width,
        props.gameSettings.current.canvasSettings.height
      );
      g.endFill();
      g.beginFill(0xffffff, 0.5);
      g.drawRect(
        0,
        props.gameSettings.current.canvasSettings.height - textBoxHeight,
        props.gameSettings.current.canvasSettings.width,
        props.gameSettings.current.canvasSettings.height / 3
      );
      g.endFill();
    },
    [props.gameSettings, textBoxHeight]
  );

  function showLoadingScreen() {
    if (props.isLoading) {
      return (
        <>
          <Graphics draw={LoadingScreen} />
          <Throbber gameSettings={props.gameSettings} />
          <Text
            text="Loading..."
            x={props.gameSettings.current.canvasSettings.width / 2}
            y={
              props.gameSettings.current.canvasSettings.height -
              textBoxHeight / 2
            }
            anchor={0.5}
          />
        </>
      );
    }
    return <></>;
  }

  return showLoadingScreen();
}
