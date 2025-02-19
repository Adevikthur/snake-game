// Game constants
// Add script to HTML using:
//
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");
const gridSize = 20;
const tileCount = canvas.width / gridSize;

// Game state
let score = 0;
let snake = [{ x: 5, y: 5 }];
let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount),
};
let dx = 0;
let dy = 0;
let gameLoop;

// Event listeners for controls
document.addEventListener("keydown", handleKeyPress);

function handleKeyPress(e) {
  switch (e.key) {
    case "ArrowUp":
      if (dy === 0) {
        dx = 0;
        dy = -1;
      }
      break;
    case "ArrowDown":
      if (dy === 0) {
        dx = 0;
        dy = 1;
      }
      break;
    case "ArrowLeft":
      if (dx === 0) {
        dx = -1;
        dy = 0;
      }
      break;
    case "ArrowRight":
      if (dx === 0) {
        dx = 1;
        dy = 0;
      }
      break;
  }
}

function drawGame() {
  // Clear canvas
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Move snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check for collision with food
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score-value").textContent = score;
    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  } else {
    snake.pop();
  }

  // Check for collision with walls or self
  if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
    gameOver();
    return;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
      return;
    }
  }

  // Draw snake
  ctx.fillStyle = "#4CAF50";
  snake.forEach((segment) => {
    ctx.fillRect(
      segment.x * gridSize,
      segment.y * gridSize,
      gridSize - 2,
      gridSize - 2
    );
  });

  // Draw food
  ctx.fillStyle = "#FF5722";
  ctx.fillRect(
    food.x * gridSize,
    food.y * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

function gameOver() {
  clearInterval(gameLoop);
  alert(`Game Over! Score: ${score}`);
  resetGame();
}

function resetGame() {
  score = 0;
  document.getElementById("score-value").textContent = score;
  snake = [{ x: 5, y: 5 }];
  food = {
    x: Math.floor(Math.random() * tileCount),
    y: Math.floor(Math.random() * tileCount),
  };
  dx = 0;
  dy = 0;

  startGame();
}

function startGame() {
  gameLoop = setInterval(drawGame, 100);
}

// Start the game
startGame();
