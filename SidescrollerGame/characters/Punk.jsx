import { Graphics, TilingSprite, useTick } from "@pixi/react";
import { useCallback, useState } from "react";

/**
 * Rework jump mechanism
 */

let i = 0;
let jump = false;
let allowedToJump = true;
const jumpHeight = 75;
const charX = 50;
const charWidth = 64;
const charHeight = 86;

let timeUp = 0;
let timeDown = 0;
const gravity = 1;
const power = 1;

let isInitialized = false;


export default function Punk(props) {
    const [x, setX] = useState(0);
    const [charY, setCharY] = useState(0);
    let charPos = 190;
    const drawBorder = useCallback(g => {
        g.clear();
        g.lineStyle(4, 0xffd900, 1);
        g.moveTo(charX, charPos + charY);
        g.lineTo(charX, charPos + charY + 60);
        g.lineTo(charX + charWidth/1.5, charPos + charY + 60);
        g.lineTo(charX + charWidth/1.5, charPos + charY);
        g.lineTo(charX, charPos + charY);
        g.endFill();
    }, [charPos, charY]);

    function characterJumpLogic(delta) {
        if (charY <= -jumpHeight) {
            jump = false;
        }
        if (charY > -jumpHeight && jump) {
            setCharY(value => value -= delta * (props.gameSettings.current.speed * 2));
            timeUp += delta;
        }
        else if (charY < 0 && !jump) {
            if (props.gameSettings.current.speed <= 0)
                return;

            
            setCharY(value => value += (gravity / 2) * timeDown * power);
            timeDown += delta / 2;
        }
        else if(charY >= 0)
            allowedToJump = true;


    }

    useTick(delta => {
        i += 0.05 * delta;
        if (x != Math.trunc(i))
            setX(Math.trunc(i * props.gameSettings.current.speed) * 96);

        characterJumpLogic(delta);
        props.setPlayerLocation({ x: charX, y: charY, width: charWidth, height: charHeight });


    })

    function initialize() {
        if (!isInitialized) {
            window.addEventListener('keydown', keydownEvent);
            isInitialized = true;
        }
    }
    initialize();

    /**
     * 
     * @param {KeyboardEvent} e 
     */
    function keydownEvent(e) {
        if (e.code == "Space" && allowedToJump) {
            timeUp = 0;
            timeDown = 0;
            jump = true;
            allowedToJump = false;
        }
    }
    
    /**
     * Debug Function
     * @returns Graphics Border
     */
    function debugBorder() {

        if (false) {
            return <Graphics draw={drawBorder}/>
        }
    }

    return (
        <>
        <TilingSprite
            image={"/Sidescroller/character/Punk_run.png"}
            width={charWidth}
            height={charHeight}
            position={{ x: charX, y: (190 + charY) }}
            tilePosition={{ x: x, y: 64 }}
            tileScale={{ x: 2, y: 2 }}
        />
        {debugBorder()}
        </>
    )
}