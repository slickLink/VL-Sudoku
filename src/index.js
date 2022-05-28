import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import FAQ from './components/FAQ';
import { GameProvider } from './context/game';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GameProvider>
      <App />
      <FAQ />
    </GameProvider>
  </React.StrictMode>
);
