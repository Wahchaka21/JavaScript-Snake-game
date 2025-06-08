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
const gridSize = { cols: 20, rows: 20 };
let food = { x: 10, y: 15 };
let currentScore = 0;

startButton.addEventListener("click", startGame);



//================================================================================================================



function moveSnake() {
  const head = snake[0];

  const newHead = {
    x: head.x + direction.x,
    y: head.y + direction.y,
  };

  if (collisionMur(newHead) || siIlSeToucheCeCon(newHead)) {
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
      currentScore = 0;
      score.textContent = "Score: 0";
      startGame();
    });

    document.body.appendChild(gameOver);
    return;
  }

  snake.unshift(newHead);

  if (newHead.x === food.x && newHead.y === food.y) {
    updateScore();
    generateBouffe();
  } else {
    snake.pop();
  }

  updateSnake();
}




//================================================================================================================




function collisionMur(head) {
  return (
    head.x < 1 || head.x > gridSize.cols ||
    head.y < 1 || head.y > gridSize.rows
  );
}



//================================================================================================================





function updateSnake() {
  const oldSnakeParts = gameContainer.querySelectorAll(".snake");
  oldSnakeParts.forEach(el => el.remove());

  for (const part of snake) {
    const pixel = document.createElement("div");
    pixel.classList.add("snake");
    pixel.style.gridColumnStart = part.x;
    pixel.style.gridRowStart = part.y;
    gameContainer.appendChild(pixel);
  }
}



//================================================================================================================



function updateScore() {
  currentScore++;
  score.textContent = "Score: " + currentScore
}




//================================================================================================================




function generateBouffe() {
  let foodX;
  let foodY;
  let surSnake = true;

  while (surSnake) {
    foodX = Math.floor(Math.random() * gridSize.cols + 1);
    foodY = Math.floor(Math.random() * gridSize.rows + 1);

    surSnake = snake.some(part => part.x === foodX && part.y === foodY);
  }

  food = { x: foodX, y: foodY };

  const ancienneBouffe = document.getElementById("bouffe");
  if (ancienneBouffe) ancienneBouffe.remove();

  const bouffe = document.createElement("div");
  bouffe.className = "bouffe";
  bouffe.id = "bouffe";
  bouffe.style.gridColumnStart = food.x;
  bouffe.style.gridRowStart = food.y;
  gameContainer.appendChild(bouffe);
}




//================================================================================================================




function siIlSeToucheCeCon(newHead) {
  return snake.some(part => part.x === newHead.x && part.y === newHead.y);
}




//================================================================================================================




function startGame() {
  const gameOverIsHere = document.querySelector(".gameOver");
  if (gameOverIsHere) {
    gameOverIsHere.remove();
  }

  gameContainer.replaceChildren();

  const snakePixel = document.createElement("div");
  snakePixel.classList.add("snake");
  snakePixel.style.gridColumnStart = 5;
  snakePixel.style.gridRowStart = 5;
  gameContainer.appendChild(snakePixel);

  generateBouffe();

  score.textContent = "Score: 0";
  currentScore = 0;

  //console.log("Et paff c'est démarrer !");
  gameInterval = setInterval(moveSnake, 200);
}
