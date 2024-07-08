import { Container, Graphics, Sprite, useTick } from "@pixi/react";
import { useCallback, useRef, useState } from "react";
import ScoreNumber from "./ScoreNumber";

const widthBox = 75;
const stageCenter = 500;
const numberSpacing = widthBox / 3;
export default function Score(props:any) {
  const draw = useCallback((g:any) => {
    g.clear();
    g.beginFill(0x212121, 0.25);
    g.drawRoundedRect(stageCenter - widthBox / 2, 10, widthBox, 38, 5);
    g.endFill();
  }, []);
  const [one, setOne] = useState(0);
  const [ten, setTen] = useState(0);
  const [hundred, setHundred] = useState(0);

  function getNumber() {
    const playerScore = props.gameSettings.current.playerScore;
    const playerScoreArr = playerScore.toString().split("");

    if (playerScoreArr.length === 1) {
        setOne(Number.parseInt(playerScoreArr[0]));
    }
    else if (playerScoreArr.length === 2) {
        setTen(Number.parseInt(playerScoreArr[0]));
        setOne(Number.parseInt(playerScoreArr[1]));
      }
      else if (playerScoreArr.length === 3) {
        setHundred(Number.parseInt(playerScoreArr[0]));
        setTen(Number.parseInt(playerScoreArr[1]));
        setOne(Number.parseInt(playerScoreArr[2]));
      }
  }
  useTick(()=>{
    getNumber();
    if(props.gameSettings.current.playerScore === 0)
      {
        setOne(0);
        setTen(0);
        setHundred(0);
      }
  })
  return (
    <>
      <Graphics draw={draw} />

      <ScoreNumber
        x={stageCenter + widthBox / 2 - numberSpacing * 1}
        number={one}
      />
      <ScoreNumber
        x={stageCenter + widthBox / 2 - numberSpacing * 2}
        number={ten}
      />
      <ScoreNumber
        x={stageCenter + widthBox / 2 - numberSpacing * 3}
        number={hundred}
      />
    </>
  );
}
