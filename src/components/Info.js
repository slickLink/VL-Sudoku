// components imports
import Game from './Game';
import Controls from "./Controls";
// contenxt imports 
import { useGame } from "../context/game";

/*
  Info: gives the user the ability to change the 
  type of sudoku game (3,4,5,6,7,8,9)
  
*/
const Info = () => {
    // get current game state & dispatch function
    const [game, dispatchGame] = useGame();

    //set game type
    function handleTypeChange(event) {
        dispatchGame({
            type: 'SET_GAME_TYPE',
            game_type: parseInt(event.target.value)
        });
    }
    
    return (
        <>
            <div className='info'>
                <label className='info-label'>Type: {game.type}</label>
                <input 
                className='info-type'
                type='range' 
                min={game.min_type} 
                max={game.max_type} 
                step={1}
                value={game.type}
                onChange={handleTypeChange}/>
            </div>
            <Game />
            <Controls />
        </>
    );
}

export default Info;