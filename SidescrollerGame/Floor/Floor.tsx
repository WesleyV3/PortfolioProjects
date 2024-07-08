import { TilingSprite, useTick } from "@pixi/react";
import { useState } from "react";

export default function Floor(props: any) {
  const [floorX, setFloorX] = useState(0); //Front layer
  const gameSettings = props.gameSettings.current;

  useTick((delta) => {
    setFloorX((floorXval) => (floorXval -= gameSettings.speed * delta));
  });

  return (
    <TilingSprite
      image={"/Sidescroller/floor/floor.png"}
      width={1000}
      height={48}
      position={{ x: 0, y: 252 }}
      tilePosition={{ x: floorX, y: 0 }}
      tileScale={{ x: 1.5, y: 1.5 }}
    />
  );
}
