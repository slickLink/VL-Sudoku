import GameSquare from "./GameSquare";
import { useGame } from "../context/game";

/*
  Game: is a resizable container that holds the game board
  resizing is dependent of the type of sudoku game (3,4,5,6,7,8,9).
  Game will generate the board (GameSquares) depending on the game type
*/
const Game = () => {

    const [game] = useGame();

    // create Game Squares
    // const num_of_squares = game.type * game.type;
    const activeSquare = game.active;
    // retrieve gamesquare values
    let game_squares_values = game.game_squares;

    //build the array of game squares
    let game_square_components = game_squares_values.map((value, i) => {
        const key = i.toString();
        const is_active = i === activeSquare ? 'active': undefined;
        const is_subactive = game.subactive.includes(i) ? 'subactive': undefined;
        const immutable = game.immutable_squares.includes(i) ? true : false;
        const display_value = immutable ? game.type_array[value - 1] : ' '; /* randomizes balanced latin square values (used as indexes) */

        return (
            <GameSquare 
                key={key} 
                active={is_active}
                subactive={is_subactive}
                position={i}
                isImmutable={immutable} 
                value={display_value} /> )  
    });

    // render
    return (
        <div className="game"
            style={{ width: `${game.width}rem` }}>
            {game_square_components}
        </div>
    );
}

export default Game;