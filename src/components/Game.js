import GameSquare from "./GameSquare";
import { useGame } from "../context/game";

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