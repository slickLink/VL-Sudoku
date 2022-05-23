import { useState } from "react";
import { useGame } from "../context/game";

/*
  GameSquare: is a resizable container that holds a single square on the game board
  each GameSquare has the ability to be set active (blue), subactive(grey) or non-active (white).
  These squares are either mutable or immuatable once rendered
*/
const GameSquare = ({game_type, active, subactive, position, value, isClue}) => {
    // retrieve game state
    const [, dispatchGame] = useGame();
    // set internal state
    //if square is a clue then don't show value
    // i know this is a bit confusing but the game is more fun this way trust me
    const [display_value, setDisplay_value] = useState(isClue ? ' ': value);

    //set active Gamesquare
    const setActive = () => {
        dispatchGame({
            type: 'SET_ACTIVE_SQUARE',
            active: position
        })
    }

    return (
        <button 
            className={`gameSquare ${active} ${subactive}`}
            style={{width: `calc(100% / ${game_type})`}}
            onClick={setActive}>
                {display_value}
        </button>
    )
}

export default GameSquare;