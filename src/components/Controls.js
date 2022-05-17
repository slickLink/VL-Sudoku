import ControlDigitButton from "./ControlDigitButton";
import { useGame } from "../context/game";

const Controls = ({game_type}) => {
    const [game] = useGame();

    let control_digits = []
    for (let i = 1; i <= game.type; i++ ) {
        control_digits.push(<ControlDigitButton num={i} key={i.toString()} />);
    }

    return (
        <div className="controls">{control_digits}</div>
    )
}

export default Controls;