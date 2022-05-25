import { useState, useEffect } from "react";
import { useGame } from "../context/game";

/*
  GameSquare: is a resizable container that holds a single square on the game board
  each GameSquare has the ability to be set active (blue), subactive(grey) or non-active (white).
  These squares are either mutable or immuatable once rendered
*/
const GameSquare = ({active, subactive, position, isImmuatable, value}) => {
    // retrieve game state
    const [game , dispatchGame] = useGame();

    //set active Gamesquare
    const toggleActive = () => {
        // tell game which square is active or not 
        dispatchGame({
            type: 'SET_ACTIVE_SQUARE',
            active: !active ? position : undefined
        });
    }


    //listens for active value changes
    // useEffect(() => {
    //     /*
    //         set display value only if 
    //         1) game.active_value is set
    //         2) GameSquare is active
    //         3) GameSquare is a clue
    //     */
    //     if (game.active_value && is_active && isMutable ) {
    //         setDisplay_value(game.active_value);
    //         // if user input is incorrect show error
    //         if (game.active_value !== value) {
    //             setError('wrong')
    //         } else {
    //             setError(undefined);
    //         }
    //     } else {
    //         dispatchGame({
    //             type: 'SET_ACTIVE_VALUE',
    //             value: undefined
    //         });
    //     }

    //     // if value changes and gamesquare is immutable then change display value
    //     if (value !== display_value && isMutable === false) {
    //         setDisplay_value(value);
    //     }
    // }, [game.active_value, is_active, isMutable, dispatchGame, value, display_value]);
    /* listen for (prop) value changes
        if prop value changes, this is a new GameSquare
    */

    // listen for changes in active index (only one active GameSquare at a time)
    // useEffect(() => {
    //     if (game.active !== position) {
    //         setIs_Active(undefined);
    //     }
    // },[game.active, position])

    return (
        <button 
            className={`gameSquare ${active} ${subactive} `}
            style={{width: `calc(100% / ${game.type})`}}
            onClick={toggleActive}>
                {value}
        </button>
    )
}

export default GameSquare;