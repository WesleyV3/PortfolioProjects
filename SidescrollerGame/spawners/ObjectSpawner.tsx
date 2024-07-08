import { useTick } from "@pixi/react";
import Obstacle, { ObstacleInfo } from "./obstacles/Obstacle";
import { nanoid } from "nanoid";
import { useRef } from "react";

const obstacleAmount = 12;
let initialized = false;
let ObstacleArray: { id: string; active: boolean; reset: boolean; obstacleInfo: ObstacleInfo }[] = [];
let i = 0;
let spawn = false;

function intervalFunc() {
  const spawnInterval = setInterval(() => {
    spawn = true;
    clearInterval(spawnInterval);
    intervalFunc();
  }, Math.random() * (1500 - 750) + 750);
}
export default function ObjectSpawner(props: any) {
  let obstacleInfoArray = useRef([
    new ObstacleInfo("/Sidescroller/obstacles/Barrel1.png", 18, 26, 1032, 235),
    new ObstacleInfo("/Sidescroller/obstacles/Barrel2.png", 18, 22, 1032, 235),
    new ObstacleInfo("/Sidescroller/obstacles/Barrel3.png", 18, 26, 1032, 235),
    new ObstacleInfo("/Sidescroller/obstacles/Box1.png", 32, 28, 1032, 235),
    new ObstacleInfo("/Sidescroller/obstacles/Box2.png", 32, 16 , 1032, 235),
    new ObstacleInfo("/Sidescroller/obstacles/Box3.png", 32, 20, 1032, 235),
    new ObstacleInfo("/Sidescroller/obstacles/Box4.png", 32, 16, 1032, 235),
    new ObstacleInfo("/Sidescroller/obstacles/Box5.png", 32, 28, 1032, 235),
    new ObstacleInfo("/Sidescroller/obstacles/Box6.png", 32, 20, 1032, 235),
  ]);

  function initialize() {
    if (!initialized) {
      intervalFunc();
      
      for (let i = 0; i < obstacleAmount; i++) {
        const tmp = Object.create(obstacleInfoArray.current[Math.floor(Math.random() * obstacleInfoArray.current.length)]);
        ObstacleArray.push({ id: nanoid(), active: false, reset: false, obstacleInfo: tmp});
      }
      initialized = true;
    }
  }

  useTick((delta) => {
    if (props.isLoading) {
      props.setIsLoading(false);
      props.gameSettings.current.speed = 3;
      props.gameSettings.current.playerScore = 0;
    }

    i += 0.05 * delta;
    if (spawn) {
      spawnSetObstacleActive();
    }
  });

  function resetObstacles() {
    if (props.isLoading) {
      ObstacleArray.forEach((obstacle) => {
        obstacle.active = false;
        obstacle.reset = true;
      });
    }
  }

  function findInactiveObstacle() {
    let inactiveObject = { id: "", active: false, reset: false,  obstacleInfo: new ObstacleInfo("", -1, -1, -1, -1)};
    ObstacleArray.forEach((obstacle) => {
      if (!obstacle.active) {
        return (inactiveObject = obstacle);
      }
    });
    return inactiveObject;
  }

  function spawnSetObstacleActive() {
    const inactiveObstacle: { id: string; active: boolean, reset: boolean, obstacleInfo: ObstacleInfo } =
      findInactiveObstacle();
    if (inactiveObstacle.id != "" && props.gameSettings.current.speed != 0 ) {
        inactiveObstacle.obstacleInfo = Object.create(obstacleInfoArray.current[Math.floor(Math.random() * obstacleInfoArray.current.length)]);
      inactiveObstacle.active = true;
    }
    spawn = false;
  }

  return (
    <>
      {initialize()}
      {resetObstacles()}
      <Obstacle
        obstacleRef={ObstacleArray[0]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[1]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[2]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[3]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[4]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[6]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[7]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[8]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[9]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[10]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
      <Obstacle
        obstacleRef={ObstacleArray[11]}
        playerRef={props.playerLocation}
        gameSettings={props.gameSettings}
      />
    </>
  );
}
