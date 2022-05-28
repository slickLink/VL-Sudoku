//context imports
import { useGame } from "../context/game";
//css imports
import './gameSquare.css';

/*
  GameSquare: is a resizable container that holds a single square on the game board
  each GameSquare has the ability to be set active (blue), subactive(grey) or non-active (white).
  These squares are either mutable or immuatable once rendered
*/
const GameSquare = ({active, subactive, position, value, status}) => {
    // retrieve game state
    const [game , dispatchGame] = useGame();


    //set active Gamesquare
    const toggleActive = () => {
        // tell game which square is active or not 
        dispatchGame({
            type: 'SET_ACTIVE_SQUARE',
            active: game.active == null ? position : null
        });
    }


    return (
        <button 
            className={`gameSquare ${active} ${subactive} ${status}`}
            style={{width: `calc(100% / ${game.type})`}}
            onClick={toggleActive}>
                {value}
        </button>
    )
}

export default GameSquare;