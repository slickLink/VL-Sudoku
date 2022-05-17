
import './App.css';
import Info from './components/Info';
import React from 'react';
import { useGame } from './context/game';

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
