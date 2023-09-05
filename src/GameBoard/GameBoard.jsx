import './GameBoard.scss';
import React from 'react';
import Snake from '../Snake/Snake';
import Food from '../Food/Food';

const GameBoard = ({ snake, food }) => {
  return (
    <div className='game-board'>
      <Snake snake={snake} />
      <Food food={food} />
    </div>
  );
};

export default GameBoard;
