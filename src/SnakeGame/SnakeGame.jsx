import React, { useState, useEffect } from "react";
import GameBoard from "../GameBoard/GameBoard";
import ButtonStart from "../ButtonStart/ButtonStart";
import "./SnakeGame.scss";

const SnakeGame = () => {
  const gridSize = 20;

  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [direction, setDirection] = useState("RIGHT");
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  // Обработчик нажатия клавиш для управления направлением змейки
  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (direction !== "DOWN") setDirection("UP");
          break;
        case "ArrowDown":
          if (direction !== "UP") setDirection("DOWN");
          break;
        case "ArrowLeft":
          if (direction !== "RIGHT") setDirection("LEFT");
          break;
        case "ArrowRight":
          if (direction !== "LEFT") setDirection("RIGHT");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [direction]);

  useEffect(() => {
    if (gameRunning) {
      const moveSnake = setInterval(() => {
        const newSnake = [...snake];
        let head = { ...newSnake[newSnake.length - 1] };

        switch (direction) {
          case "UP":
            head.y -= 1;
            break;
          case "DOWN":
            head.y += 1;
            break;
          case "LEFT":
            head.x -= 1;
            break;
          case "RIGHT":
            head.x += 1;
            break;
          default:
            break;
        }

        // Добавление новой позиции головы
        newSnake.push(head);

        // Проверка на поедание пищи
        if (head.x === food.x && head.y === food.y) {
          setScore(score + 1);
          generateFood();
        } else {
          newSnake.shift();
        }
        // Обновление состояния змейки
        setSnake(newSnake);

        if (isCollision(head) || isOutOfBounds(head)) {
          clearInterval(moveSnake);
          alert("Game Over");

          setSnake([{ x: 2, y: 2 }]);
          setFood({ x: 10, y: 10 });
          setDirection("RIGHT");
          setScore(0);
          generateFood();

          setGameRunning(false);
        }
      }, 200);

      return () => {
        clearInterval(moveSnake);
      };
    }
  }, [gameRunning, snake, direction, food, score]);

  const handleStartGame = () => {
    setGameRunning(true);
    generateFood();
  };

  // Генерация новой пищи
  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
    } while (isCellOccupiedBySnake(newFood));

    setFood(newFood);
  };

  const isCellOccupiedBySnake = (cell) => {
    for (let segment of snake) {
      if (segment.x === cell.x && segment.y === cell.y) {
        return true;
      }
    }
    return false;
  };

  // Проверка столкновения с собой
  const isCollision = (head) => {
    for (let segment of snake) {
      if (segment.x === head.x && segment.y === head.y) {
        return true;
      }
    }
    return false;
  };

  // Проверка столкновения со стеной
  const isOutOfBounds = (head) => {
    return head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize;
  };

  return (
    <div className="snake-game">
      <ButtonStart onClick={handleStartGame} />
      <div>Score: {score}</div>
      <GameBoard snake={snake} food={food} gameStarted={gameRunning} />
    </div>
  );
};

export default SnakeGame;
