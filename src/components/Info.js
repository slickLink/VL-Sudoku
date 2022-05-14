import { useState } from "react";
import Game from './Game';

const Info = ({minT, maxT}) => {
    let [game_type, setGameType] = useState(minT);
    
    
    const handleGameType = (event) => {
        const new_game_type = event.target.value;
        setGameType(prevState => new_game_type);
    }
    
    return (
        <div className='info'>
            <label className='info-label'>Type:</label>
            <input 
            className='info-type'
            type='range' 
            min={minT} 
            max={maxT} 
            step={1}
            value={game_type}
            onChange={handleGameType}/>
            <p>{game_type}</p>
            <Game game_type/>
        </div>
    );
}

export default Info;