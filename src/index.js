import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
const MIN_TYPE = 3;
const MAX_TYPE = 9;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App 
    min_type={MIN_TYPE} 
    max_type={MAX_TYPE}/>
  </React.StrictMode>
);
