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
    const [game, dispatchGame] = useGame();

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

    //listen for set active value changes
    useEffect(() => {
        //handle user input for currently active value
        /*
            only update GameSquare display value when :
            1) active index is not null
            2) game.active_value is set (meaning user has clicked a control button)
            3) active Gamesquare is mutable
            4) user input is correct value (compared to game_board equivalent)
            4.1) if user input wrong, then indicate wrong value
        */
        if (active !== null && game.active_value && !game.immutable_squares.includes(active)) {
            console.log(`display ${game.active_value} here`)
            if (game.active_value === game_board[active]) {
                // make active gameSquare immutable (this also shows the correct value)
                dispatchGame({
                    type: 'ADD_IMMUTABLE_INDEX',
                    new_index: active
                });
                setGState(getGameSquareObjectsfromValues(active, game_board, game.subactive, game.immutable_squares));
            }
        } else {
            dispatchGame({
                type: 'SET_ACTIVE_VALUE',
                value: null
            });
        }
    },[active, game.active_value, dispatchGame, game.immutable_squares, game_board,  getGameSquareObjectsfromValues, game.subactive])
    // render
    return (
        <div className="game"
            style={{ width: `${game.width}rem` }}>
            {g_state}
        </div>
    );
}

export default Game;