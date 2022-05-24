import { useState, useEffect } from "react";
import { useGame } from "../context/game";

/*
  GameSquare: is a resizable container that holds a single square on the game board
  each GameSquare has the ability to be set active (blue), subactive(grey) or non-active (white).
  These squares are either mutable or immuatable once rendered
*/
const GameSquare = ({game_type, active, subactive, position, value, isClue}) => {
    // retrieve game state
    const [game , dispatchGame] = useGame();
    // set internal state
    //if square is a clue then don't show value
    // i know this is a bit confusing but the game is more fun this way trust me
    const default_value = isClue ? ' ' : value;
    const [display_value, setDisplay_value] = useState(default_value);
    const [error, setError] = useState(undefined)

    //set active Gamesquare
    const setActive = () => {
        dispatchGame({
            type: 'SET_ACTIVE_SQUARE',
            active: position
        })
    }

    //listens for active value changes
    useEffect(() => {
        /*
            set display value only if 
            1) game.active_value is set
            2) GameSquare is active
            3) GameSquare is a clue
        */
        if (game.active_value && active && isClue ) {
            setDisplay_value(game.active_value);
            // if user input is incorrect show error
            if (game.active_value !== value) {
                setError('wrong')
            } else {
                setError(undefined);
            }
        } else {
            dispatchGame({
                type: 'SET_ACTIVE_VALUE',
                value: undefined
            });
        }
    }, [game.active_value, active, isClue, dispatchGame, value]);

    return (
        <button 
            className={`gameSquare ${active} ${subactive} ${error}`}
            style={{width: `calc(100% / ${game_type})`}}
            onClick={setActive}>
                {display_value}
        </button>
    )
}

export default GameSquare;