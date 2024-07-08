import { Sprite, useTick } from "@pixi/react";
import { useRef, useState } from "react";

export interface IScoreNumber {
    src: string,
    description: Number
}

export default function ScoreNumber(props:any)
{
    const scoreNumbers = useRef([
        {src: '/Sidescroller/score/0.png', description: 0},
        {src: '/Sidescroller/score/1.png', description: 1},
        {src: '/Sidescroller/score/2.png', description: 2},
        {src: '/Sidescroller/score/3.png', description: 3},
        {src: '/Sidescroller/score/4.png', description: 4},
        {src: '/Sidescroller/score/5.png', description: 5},
        {src: '/Sidescroller/score/6.png', description: 6},
        {src: '/Sidescroller/score/7.png', description: 7},
        {src: '/Sidescroller/score/8.png', description: 8},
        {src: '/Sidescroller/score/9.png', description: 9},
    ])

    const [imageSrc, setImageSrc] = useState('/Sidescroller/score/0.png');

    useTick((deltaMs) => {
        const scoreNumber =  findScoreNumber(props.number);
        if(scoreNumber && scoreNumber.src != imageSrc)
            setImageSrc(scoreNumber.src);
    })

    function findScoreNumber(number: Number)
    {
        return scoreNumbers.current.find(numberItem => numberItem.description === number);
    }

    return (<Sprite 
        image={imageSrc}
        x={props.x - 4}
        y={10}
    />)
}