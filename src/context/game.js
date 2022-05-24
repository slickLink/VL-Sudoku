import { createContext, useReducer, useContext } from "react";
import {getSubactive, getRandomSequence, getRandomSequenceClues} from "../gameUtil";

// variables
const MIN_TYPE = 3;
const MAX_TYPE = 9;
// let game_width = 9 * (game_type / 3);
// let game_margin = 9 / (game_type / 3) - 3;

// used for creating an entry point to use the provider (Context)
const gameContext = createContext();

//game reducer function, handles all game state actions
const gameReducer = (state, action) => {
    switch (action.type) {
        case 'SET_GAME_TYPE':
            return {...state,
                type: action.game_type,
                type_array: getRandomSequence(action.game_type),
                width: MIN_TYPE * (action.game_type), // calculates css attribute
                margin: MAX_TYPE / (action.game_type), // calculates css attribute
                active: undefined,
                
                subactive: [],
                num_clues: Math.ceil((action.game_type * action.game_type) / MIN_TYPE) + MIN_TYPE, // calculates num of clues for type of board
                clues: getRandomSequenceClues(Math.ceil((action.game_type * action.game_type) / MIN_TYPE) + MIN_TYPE, action.game_type * action.game_type)
            }
        case 'SET_ACTIVE_SQUARE':
            return {...state,
                active: action.active,
                subactive: getSubactive(action.active, state.type)
            }
        case 'SET_ACTIVE_VALUE':
            return {...state,
                active_value: action.value
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// game provider holds data about the current game state
const GameProvider = (props) => {
    const [game, dispatch] = useReducer(gameReducer, {
        min_type: MIN_TYPE,
        max_type: MAX_TYPE,
        type: MIN_TYPE,
        type_array: getRandomSequence(MIN_TYPE),
        width: MAX_TYPE,
        margin: MAX_TYPE,
        active: undefined,
        active_value: undefined,
        subactive:[],
        clues: getRandomSequenceClues(Math.ceil((MIN_TYPE * MIN_TYPE) / MIN_TYPE) + MIN_TYPE, MIN_TYPE * MIN_TYPE) // 6
    });

    // values that will be passed to wrapped components via GameContext.Provider to children
    const value = [game, dispatch];
    return (
        <gameContext.Provider value={value}>
            {props.children}
        </gameContext.Provider>
    )  
}

// better developer experience - no need to import useContext to use Provider in other Components
const useGame = () => {
    const context = useContext(gameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}
// export provider and consumer functions
export {GameProvider, useGame};