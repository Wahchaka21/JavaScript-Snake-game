const startButton = document.getElementById("startButton");
const score = document.getElementById("score");
const gameContainer = document.querySelector(".game-container");

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowUp":
      break;
    case "ArrowDown":
      break;
    case "ArrowLeft":
      break;
    case "ArrowRight":
      break;
  }
});

startButton.addEventListener("click", startGame);

function moveSnake() {}

function generateFood() {}

function checkCollision() {}

function updateScore() {}

function eatBouffe() {}

function startGame() {
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
}
