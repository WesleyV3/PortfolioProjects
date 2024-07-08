import { Graphics, Sprite, useTick } from "@pixi/react";
import { useCallback, useRef, useState } from "react";
import { getAbsoluteCenter } from "../helpers/Helpers";

export default function Throbber(props:any)
{
    const [rotation, setRotation] = useState(0);
    const speed = useRef(4);

    const throbberElement = useRef({width: 100, height: 100});
    const throbberCenter = getAbsoluteCenter(props.gameSettings.current.canvasSettings.width / 2, 0, props.gameSettings.current.canvasSettings.height/2, 0);

    useTick((deltaMs) => {
        setRotation(rotationVal => rotationVal += (deltaMs * speed.current));
    })

    return (
        <Sprite
        image={"/Sidescroller/throbber/Throbber.png"}
        x={throbberCenter.x}
        y={throbberCenter.y}
        width={throbberElement.current.width}
        height={throbberElement.current.height}
        angle={rotation}
        anchor={0.5}
        />
    )
}