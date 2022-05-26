import GameSquare from "./GameSquare";
import { useGame } from "../context/game";
import { useCallback, useEffect, useState } from "react";

/*
  Game: is a resizable container that holds the game board
  resizing is dependent of the type of sudoku game (3,4,5,6,7,8,9).
  Game will generate the board (GameSquares) depending on the game type
*/
const Game = ({game_board}) => {
    //retrieve game context
    const [game] = useGame();

    //get gamesquareobjects
    const getGameSquareObjectsfromValues = useCallback((activeIndex, game_board, subactive_arr, immuatables_arr) => {
        // converts game values to game objects
        let game_state = game_board.map((value, index) => {
            const is_active = index === activeIndex ? 'active': null;
            const is_subactive = subactive_arr.includes(index) ? 'subactive': null;
            const immutable = immuatables_arr.includes(index) ? true : false;
            const display_value = immutable ? value : null;
            return (
                <GameSquare
                    key={index.toString()}
                    active={is_active}
                    subactive={is_subactive}
                    position={index}
                    value={display_value} />);
        });
        return game_state;
    },[]);
    
    //set internal state
    const [g_state, setGState] = useState(getGameSquareObjectsfromValues(game.active, game_board, game.subactive, game.immutable_squares));
    const [active, setActive] = useState(game.active);

    //listen for game_board changes
    useEffect(() => {
        //handle change in game type
        if (g_state.length !== game_board.length){
            setGState(getGameSquareObjectsfromValues(active, game_board, game.subactive, game.immutable_squares));
        }
    }, [g_state, game_board, getGameSquareObjectsfromValues, active, game.subactive, game.immutable_squares]);

    //listen for active GameSquare
    useEffect(() => {
        //handle change in game active index
        if (game.active !== active) {
            setActive(game.active)
            setGState(getGameSquareObjectsfromValues(game.active, game_board, game.subactive, game.immutable_squares));
        }
    }, [active, game.active, getGameSquareObjectsfromValues, game_board, game.subactive, game.immutable_squares]);
    // render
    return (
        <div className="game"
            style={{ width: `${game.width}rem` }}>
            {g_state}
        </div>
    );
}

export default Game;