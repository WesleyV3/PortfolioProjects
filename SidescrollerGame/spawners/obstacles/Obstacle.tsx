import { useTick, Sprite } from "@pixi/react";
import { useState } from "react";

export class ObstacleInfo {
  public imageURL: String;
  public width: Number;
  public height: Number;
  public x: Number;
  public y: Number;

  constructor(
    imageUrl: string,
    width: number,
    height: number,
    x: number,
    y: number
  ) {
    this.imageURL = imageUrl;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
  }
}

const xMaxOffscreen = 1032;
let playerPassed = false;
const scale = { x: 1.5, y: 1.5 };

export default function Obstacle(props : any) {
  const [x, setX] = useState(props.obstacleRef.obstacleInfo.x);
  const [y, setY] = useState(props.obstacleRef.obstacleInfo.y);
  const [id, setId] = useState("");

  useTick((delta) => {
    if (props.obstacleRef.reset) {
      setX(xMaxOffscreen);
      props.obstacleRef.active = false;
      props.obstacleRef.reset = false;
    }

    if (id === "") setId(props.obstacleRef.id);

    if (props.obstacleRef.active) {
      setX((xVal: number) => xVal - delta * props.gameSettings.current.speed);
      checkCollision();
    }

    if (x < -64) {
      props.obstacleRef.active = false;
      playerPassed = false;
      setX(xMaxOffscreen);
    }
  });

  function checkCollision() {
    
      if (x > props.playerRef.x && x < props.playerRef.x + (props.playerRef.width - 5)) {
      if (Math.abs(props.playerRef.y) < (props.obstacleRef.obstacleInfo.height * scale.y)) {
        props.obstacleRef.active = false;
        props.gameSettings.current.speed = 0;
        props.gameSettings.current.gameOver = true;
        window.addEventListener('keydown', props.gameSettings.current.restartGame);
      }
    }
    if (props.playerRef.x > x + (props.obstacleRef.obstacleInfo.width * scale.x) && !playerPassed) {
      props.gameSettings.current.playerScore++;
      playerPassed = true;
    }
  }

  return (
    <Sprite
      image={props.obstacleRef.obstacleInfo.imageURL}
      scale={{ x: scale.x, y: scale.y }}
      anchor={0.5}
      x={x}
      y={y}
    />
  );
}
