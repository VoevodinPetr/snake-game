import React from 'react';
import "./App.scss";

import SnakeGame from "./SnakeGame/SnakeGame";

function App() {

  return (
    <div className="app">
      <h1 className="app__title">Snake Game</h1>
     
      <SnakeGame />
    </div>
  );
}

export default App;
