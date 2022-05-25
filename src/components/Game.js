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
        let game_state = game_board.map((value, i) => {
            const is_active = i === activeIndex ? 'active': null;
            const is_subactive = subactive_arr.includes(i) ? 'subactive': undefined;
            const immutable = immuatables_arr.includes(i) ? true : false;
            const display_value = immutable ? value : null;
            return ({
                active: is_active,
                subactive: is_subactive,
                value: display_value
            });
        });
        return game_state;
    },[]);
    
    //set internal state
    const [g_state, setGState] = useState(getGameSquareObjectsfromValues(game.active, game_board, game.subactive, game.immutable_squares));

    //listen for game_board changes
    useEffect(() => {
        let update_board = false;
        //handle change in game type
        if (g_state.length !== game_board.length){
            update_board = true;
        }

        if (g_state[game.active].active === 'active' && g_state.indexOf(game.active) !== game.active) {
            update_board = true;
        }

        //handle change in game.active
        // if (g_state[game.active] !== game.active) {
        //     const gameObject = g_state;
        //     gameObject[game.active].active = 'active';
        //     setGState(gameObject)
        //     // console.log(g_state[game.active]);
        // }
        if (update_board) {
            const gameObject = getGameSquareObjectsfromValues(game.active, game_board, game.subactive, game.immutable_squares)
            setGState(gameObject);
        }
    }, [g_state, game_board, getGameSquareObjectsfromValues, game.active, game.subactive, game.immutable_squares]);


    // create Game Squares
    // const num_of_squares = game.type * game.type;
   
    // retrieve gamesquare values
    //build the array of game squares
    // let game_square_components = game_board.map((value, i) => {
    //     const key = i.toString();
    //     const is_active = i === activeSquare ? 'active': undefined;
    //     const is_subactive = game.subactive.includes(i) ? 'subactive': undefined;
    //     const immutable = game.immutable_squares.includes(i) ? true : false;
    //     const display_value = immutable ? value : ' ';

    //     return (
    //         <GameSquare 
    //             key={key} 
    //             active={is_active}
    //             subactive={is_subactive}
    //             position={i}
    //             value={display_value} /> )  
    // });
    
    // set internal state

    //listen for active value changes
    // useEffect(() => {
    //     if(game.active_value)
    // })
    const game_square_components = g_state.map((square, index) => (
        <GameSquare
            key={index.toString()}
            active={square.active}
            subactive={square.subactive}
            position={index}
            value={square.value} />
    ))
    // render
    return (
        <div className="game"
            style={{ width: `${game.width}rem` }}>
            {game_square_components}
        </div>
    );
}

export default Game;