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
    const num_of_squares = game.type * game.type;
    const activeSquare = game.active;
    //build the array of game squares
    let game_squares = []
    for (let i = 0; i < num_of_squares; i++) {
        game_squares.push(<GameSquare 
                                key={i.toString()} 
                                game_type={game.type}
                                active={ i === activeSquare ? 'active': undefined}
                                subactive={ game.subactive.includes(i) ? 'subactive': undefined}
                                position={i}/>)
    }

    return (
        <div className="game"
            style={{ width: `${game.width}rem` }}>
            {game_squares}
        </div>
    )
}

export default Game;