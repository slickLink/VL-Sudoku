// component imports
import Info from './components/Info';
//context imports
import { useGame } from './context/game';
// react imports
import React from 'react';
//css imports
import './App.css';

/*
  App: is a resizable container that holds the entire app
  resizing is dependent of the type of sudoku game (3,4,5,6,7,8,9)
*/
function App(props) {
  //get current game state
  const [game] = useGame();
  const offset = 2;

  return (
    <div className='app'
      style={{ width: `${game.width + offset}rem` }}>
      <Info />
    </div>
  );
}

export default App;
