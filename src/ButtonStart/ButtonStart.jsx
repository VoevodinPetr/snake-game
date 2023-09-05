import React from "react";
import "./ButtonStart.scss";

const ButtonStart = ({ onClick, isGameStarted }) => {
  return (
    <button className="button-start" onClick={onClick}>
      {isGameStarted ? "Pause" : "Start"}
    </button>
  );
};

export default ButtonStart;


