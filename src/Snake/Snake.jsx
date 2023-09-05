import React from "react";
import "./Snake.scss";

const Snake = ({ snake }) => {
  return (
    <div>
      {snake.map((segment, index) => (
        <div
          className="snake"
          key={index}
          style={{
            top: segment.y * 20, // Умножаем на 20 для получения пиксельных координат
            left: segment.x * 20,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Snake;
