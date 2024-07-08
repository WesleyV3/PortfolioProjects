import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Stage } from "@pixi/react";
import Punk from "./characters/Punk";
import Background from "./Background/Background";
import ObjectSpawner from "./spawners/ObjectSpawner";
import Floor from "./Floor/Floor";
import Score from "./Score/Score";
import GameOver from "./GameOver/GameOver";
import LoadingScreen from "./Loading/LoadingScreen";
import StartGame from "./StartGame/StartGame";
import GameLogic from "./GameLogic/GameLogic";

export default function SidescrollerGame() {
  const [playerLocation, setPlayerLocation] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const gameSettings = useRef({
    canvasSettings: { width: 1000, height: 300 },
    speed: 0,
    playerScore: 0,
    gameOver: false,
    restartGame: null,
  });

  return (
    <Stage
      width={gameSettings.current.canvasSettings.width}
      height={gameSettings.current.canvasSettings.height}
      options={{ background: 0x1099bb }}
    >
      <GameLogic gameSettings={gameSettings}/>
      <Background gameSettings={gameSettings} />
      <Floor gameSettings={gameSettings} />
      <Score gameSettings={gameSettings} />
      <Punk setPlayerLocation={setPlayerLocation} gameSettings={gameSettings} />
      <ObjectSpawner
        playerLocation={playerLocation}
        gameSettings={gameSettings}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      
      <StartGame gameSettings={gameSettings} />
      <GameOver gameSettings={gameSettings} setIsLoading={setIsLoading} />
      <LoadingScreen gameSettings={gameSettings} setIsLoading={setIsLoading} isLoading={isLoading} />

    </Stage>
  );
}
