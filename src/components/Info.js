import { useState } from "react";
import Game from './Game';

const Info = ({minT, maxT}) => {
    let [game_type, setGameType] = useState(minT);
    
    
    const handleGameType = (event) => {
        const new_game_type = event.target.value;
        setGameType(prevState => new_game_type);
    }

    //calculate game position
    let game_width = 9 * (game_type / 3);
    let game_margin = 9 / (game_type / 3) - 3;
    
    return (
        <>
            <div className='info'
                style={{
                    width: `${game_width}rem`,
                    margin: `0rem ${game_margin}rem`}}>
                <label className='info-label'>Type:</label>
                <p>{game_type}</p>
                <input 
                className='info-type'
                type='range' 
                min={minT} 
                max={maxT} 
                step={1}
                value={game_type}
                onChange={handleGameType}/>
            </div>
            <Game 
                game_type={game_type}/>
        </>
    );
}

export default Info;