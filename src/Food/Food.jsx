import "./Food.scss";
import React from "react";

const Food = ({ food }) => {
  return (
    <div
      className="food"
      style={{
        top: food.y * 20,
        left: food.x * 20,
      }}
    ></div>
  );
};

export default Food;
