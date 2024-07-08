import { useTick } from "@pixi/react"


export default function GameLogic(props : any)
{
    useTick(deltaMs => {
        increaseDifficulty();
    })
    
    function increaseDifficulty() {
        const baseSpeed = 3;
        const speedMultiplier = (props.gameSettings.current.playerScore / 10);
        
        if (props.gameSettings.current.speed > 0 && props.gameSettings.current.playerScore > 0) {
            props.gameSettings.current.speed = baseSpeed + speedMultiplier;
        }
    }
    
    return (<></>);
}
