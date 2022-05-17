import { useGame } from "../context/game";

const GameSquare = ({game_type, active, subactive, position}) => {

    const [, dispatchGame] = useGame();

    const setActive = () => {
        dispatchGame({
            type: 'SET_ACTIVE_SQUARE',
            active: position
        })
    }

    return (
        <button 
            className={`gameSquare ${active} ${subactive}`}
            style={{width: `calc(100% / ${game_type})`}}
            onClick={setActive}>8</button>
    )
}

export default GameSquare;