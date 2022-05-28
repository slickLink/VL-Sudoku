// components imports
import GameSquare from "./GameSquare";
// context imports 
import { useGame } from "../context/game";
// react imports
import { useCallback, useEffect, useState } from "react";
// css imports
import './game.css';

/*
  Game: is a resizable container that holds the game board
  resizing is dependent of the type of sudoku game (3,4,5,6,7,8,9).
  Game will generate the board (GameSquares) depending on the game type
*/
const Game = ({game_board}) => {
    //retrieve game context
    const [game, dispatchGame] = useGame();

    //get gamesquareobjects
    const getGameSquareObjectsfromValues = useCallback((activeIndex, game_board, subactive_arr, immuatables_arr, status) => {
        // converts game values to game objects
        let game_state = game_board.map((value, index) => {
            const is_active = index === activeIndex ? 'active': null;
            const is_subactive = subactive_arr.includes(index) ? 'subactive': null;
            const immutable = immuatables_arr.has(index) ? true : false;
            const display_value = immutable ? value : null;
            return (
                <GameSquare
                    key={index.toString()}
                    active={is_active}
                    subactive={is_subactive}
                    position={index}
                    value={display_value}
                    status={status[index]} />);
        });
        return game_state;
    },[]);
    
    //set internal state
    /*
        status (state) can be ''(default) || 'corrrect' || 'wrong' for each GameSquare
    */
    let new_status = new Array(game_board.length);
    for(let i = 0; i < game_board.length; i++){
        new_status[i] = '';
    }
    const [g_state, setGState] = useState(getGameSquareObjectsfromValues(game.active, game_board, game.subactive, game.immutable_squares, new_status));
    const [active, setActive] = useState(game.active);
    const [status, setStatus] = useState(new_status);

    //listen for game_board changes
    useEffect(() => {
        //handle change in game type
        if (g_state.length !== game_board.length){
            setGState(getGameSquareObjectsfromValues(active, game_board, game.subactive, game.immutable_squares, status));
            // reset all state
            let new_status = new Array(game_board.length);
            for(let i = 0; i < game_board.length; i++){
                new_status[i] = '';
            }
            setStatus(new_status);
            setActive(undefined);
        }
    }, [g_state, game_board, getGameSquareObjectsfromValues, active, game.subactive, game.immutable_squares, status]);

    //listen for active GameSquare
    useEffect(() => {
        //handle change in game active index
        if (game.active !== active) {
            setActive(game.active)
            setGState(getGameSquareObjectsfromValues(game.active, game_board, game.subactive, game.immutable_squares, status));
        }
    }, [active, game.active, getGameSquareObjectsfromValues, game_board, game.subactive, game.immutable_squares, status]);

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
        let current_status = status;
        let current_immutables = game.immutable_squares;
        if (active !== null && game.active_value && !game.immutable_squares.has(active)) {
            // console.log(`display ${game.active_value} here`)
            if (game.active_value === game_board[active]) {
                // tell Game to add active gameSquare to immutable arr
                dispatchGame({
                    type: 'ADD_IMMUTABLE_INDEX',
                    new_index: active
                });
                // allows display value to show on active Gamesquare
                current_immutables.add(active);
                // set "correct" status
                current_status[active] = 'correct';
            } else {
                //set "wrong" status
                current_status[active] = 'wrong';
            }
            setGState(getGameSquareObjectsfromValues(game.active, game_board, game.subactive, current_immutables, status));
            setStatus(current_status);
        } else {
            // if there is no active value wipe status state to default ''
            if (active == null) {
                for(let i = 0; i < game_board.length; i++) {
                    current_status[i] = '';
                }
                setGState(getGameSquareObjectsfromValues(game.active, game_board, game.subactive, current_immutables, current_status));
                setStatus(current_status);
            }
            dispatchGame({
                type: 'SET_ACTIVE_VALUE',
                value: null
            });
        }
        
    },[active, game.active_value, dispatchGame, game.immutable_squares, game_board, status, setStatus, getGameSquareObjectsfromValues, game.active,  game.subactive])

    // render
    return (
        <div className="game"
            style={{ width: `${game.width}rem` }}>
            {g_state}
        </div>
    );
}

export default Game;