import ControlDigitButton from "./ControlDigitButton";
import { useGame } from "../context/game";

/*
  Controls: is a container that holds the user inputs, these change
  dependent of the type of sudoku game (3,4,5,6,7,8,9)
  ex: game of 3 -> [1,2,3]
  ex: game of 9 -> [1,2,3,4,5,6,7,8,9]
*/
const Controls = () => {
    // retrieve game state
    const [game] = useGame();

    //build control digits based on game_type
    let control_digits = []
    for (let i = 1; i <= game.type; i++ ) {
        control_digits.push(<ControlDigitButton num={i} key={i.toString()} />);
    }

    return (
        <div className="controls">{control_digits}</div>
    )
}

export default Controls;