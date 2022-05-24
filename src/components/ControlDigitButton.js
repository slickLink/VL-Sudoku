import { useGame } from "../context/game"
/*
  Controls: renders a button control for user given a value
*/
const ControlDigitButton = ({num}) => {
    const [, dispatchGame] = useGame();

    const registerPossibleValue = () => {
        dispatchGame({
            type: 'SET_ACTIVE_VALUE',
            value: num
        });
    }

    return (
        <button 
        className="controldigitButton"
        onClick={registerPossibleValue}>{num}</button>
    )
}

export default ControlDigitButton;