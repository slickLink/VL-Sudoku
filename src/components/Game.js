import GameSquare from "./GameSquare";

const Game = ({game_type}) => {
    
    // create Game Squares
    const num_of_squares = game_type * game_type;
    let game_squares = []
    //build the array of game squares
    for (let i = 0; i < num_of_squares; i++) {
        game_squares.push(<GameSquare key={i.toString()}/>)
    }

    //calculate game position
    let game_width = 9 * (game_type / 3);
    let game_margin = 9 / (game_type / 3) - 3;
    return (
        <div className="game"
            style={{
                width: `${game_width}rem`,
                margin: `0rem ${game_margin}rem`}}>
            
            {game_squares}
            {/* <Controls /> */}
        </div>
    )
}

export default Game;