import GameSquare from "./GameSquare";
import { useGame } from "../context/game";
import { generateGame} from "../gameUtil";
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

    // turn 2D array table to 1D array
    let game_squares = generateGame(game.type).flat();
    //build the array of game squares
    game_squares = game_squares.map((value, i) => (
        <GameSquare 
            key={i.toString()} 
            game_type={game.type}
            active={ i === activeSquare ? 'active': undefined}
            subactive={ game.subactive.includes(i) ? 'subactive': undefined}
            position={i}
            value={game.type_array[value - 1]} /* randomizes balanced latin square values */
            isClue={game.clues.includes(i) ? true : false} />
    ));

    return (
        <div className="game"
            style={{ width: `${game.width}rem` }}>
            {game_squares}
        </div>
    )
}

export default Game;