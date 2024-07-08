import { TilingSprite, useTick } from "@pixi/react";
import { useState } from "react";

export default function Background(props : any) {
  const [layer2x, setLayer2x] = useState(0); //Layer in the back
  const [layer3x, setLayer3x] = useState(0);
  const [layer4x, setLayer4x] = useState(0);
  const [layer5x, setLayer5x] = useState(0); //Front layer
  const gameSettings = props.gameSettings.current;
  const backgroundSpeed = gameSettings.speed / 5;

  useTick((delta) => {
    setLayer2x((xValue) => (xValue -= (backgroundSpeed * 1) * delta));
    setLayer3x((xValue) => (xValue -= (backgroundSpeed * 2) * delta));
    setLayer4x((xValue) => (xValue -= (backgroundSpeed * 3) * delta));
    setLayer5x((xValue) => (xValue -= (backgroundSpeed * 4) * delta));
  });

  return (
    <>
      <TilingSprite
        image={"/Sidescroller/background/1.png"}
        width={1000}
        height={300}
        position={{ x: 0, y: 0 }}
        tilePosition={{ x: 0, y: 0 }}
        tileScale={{ x: 1, y: 1 }}
      />
      <TilingSprite
        image={"/Sidescroller/background/2.png"}
        width={1000}
        height={300}
        position={{ x: 0, y: 0 }}
        tilePosition={{ x: layer2x, y: 0 }}
        tileScale={{ x: 1, y: 1 }}
      />

      <TilingSprite
        image={"/Sidescroller/background/3.png"}
        width={1000}
        height={300}
        position={{ x: 0, y: 0 }}
        tilePosition={{ x: layer3x, y: 0 }}
        tileScale={{ x: 1, y: 1 }}
      />

      <TilingSprite
        image={"/Sidescroller/background/4.png"}
        width={1000}
        height={300}
        position={{ x: 0, y: 0 }}
        tilePosition={{ x: layer4x, y: 0 }}
        tileScale={{ x: 1, y: 1 }}
      />

      <TilingSprite
        image={"/Sidescroller/background/5.png"}
        width={1000}
        height={300}
        position={{ x: 0, y: 0 }}
        tilePosition={{ x: layer5x, y: 0 }}
        tileScale={{ x: 1, y: 1 }}
      />
    </>
  );
}
