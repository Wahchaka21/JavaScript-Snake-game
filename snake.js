const startButton = document.getElementById("startButton");
const score = document.getElementById("score");
const gameContainer = document.querySelector(".game-container");



document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction.y === 0) direction = { x: 0, y: -1 };
      break;
    case "ArrowDown":
      if (direction.y === 0) direction = { x: 0, y: 1 };
      break;
    case "ArrowLeft":
      if (direction.x === 0) direction = { x: -1, y: 0 };
      break;
    case "ArrowRight":
      if (direction.x === 0) direction = { x: 1, y: 0 };
      break;
  }
});



let snake = [{ x: 5, y: 5 }];
let direction = { x: 1, y: 0 };
let gameInterval;
const gridSize = { cols: 20, rows: 20}

startButton.addEventListener("click", startGame);



//================================================================================================================




function moveSnake() {
  const head = snake[0];

  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  if (collisionMur(newHead)) {
    clearInterval(gameInterval);

    const gameOver = document.createElement("div");
    gameOver.className = "gameOver";

    const title = document.createElement("h2");
    title.textContent = "Game Over";
    gameOver.appendChild(title);

    const replay = document.createElement("button");
    replay.className = "replay";
    replay.textContent = "Rejouer";
    gameOver.appendChild(replay);

    replay.addEventListener("click", () => {
      gameOver.remove();
      snake = [{ x: 5, y: 5 }];
      direction = { x: 1, y: 0 };
      score.textContent = "Score: 0";
      startGame();
    });

    document.body.appendChild(gameOver);
    return;
  }

  snake.unshift(newHead);
  snake.pop();
  updateSnake();
}


//================================================================================================================


function collisionMur(head) {
  return (head.x < 1 || head.x > gridSize.cols || head.y < 1 || head.y > gridSize.rows)
}

function updateSnake() {
  gameContainer.replaceChildren();

  for (const part of snake) {
    const pixel = document.createElement("div");
    pixel.classList.add("snake");
    pixel.style.gridColumnStart = part.x;
    pixel.style.gridRowStart = part.y;
    gameContainer.appendChild(pixel);
  }
}



//================================================================================================================


function eatBouffe() {}



//================================================================================================================





function snakeBody() {}



//================================================================================================================





function updateScore() {}



//================================================================================================================





function generateFood() {}



//================================================================================================================





function checkCollision() {}



//================================================================================================================







function startGame() {
  const gameOverIsHere = document.querySelector("gameOver")
  if (gameOverIsHere) {
    gameOverIsHere.remove()
  }
  gameContainer.replaceChildren();

  const snakePixel = document.createElement("div");
  snakePixel.classList.add("snake");
  snakePixel.style.gridColumnStart = 5;
  snakePixel.style.gridRowStart = 5;
  gameContainer.appendChild(snakePixel);

  const foodPixel = document.createElement("div");
  foodPixel.classList.add("bouffe");
  foodPixel.style.gridColumnStart = 10;
  foodPixel.style.gridRowStart = 15;
  gameContainer.appendChild(foodPixel);

  score.textContent = "Score: 0";

  console.log("Et paff c'est démarrer !");
  snake;
  direction;
  gameInterval = setInterval(moveSnake, 200);
}
