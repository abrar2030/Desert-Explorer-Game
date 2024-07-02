document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startGame").addEventListener("click", startGame);

  document.addEventListener("keydown", handleKeyPress);
});

function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      movePlayer("up");
      break;
    case "ArrowDown":
      movePlayer("down");
      break;
    case "ArrowLeft":
      movePlayer("left");
      break;
    case "ArrowRight":
      movePlayer("right");
      break;
    case " ":
      dig();
      break;
    default:
      break;
  }
}

let initialTime = 0; 
let currentTime = 0; 
let timerInterval; 

function startGame() {
  initializeGameData();

  const playerNameInput = document.getElementById("playerName");
  const initialWaterSupplyInput = document.getElementById("initialWaterSupply");
  const initialTimeInput = document.getElementById("initialTime");

  const playerName = playerNameInput.value.trim() || "Player";
  const initialWaterSupply = parseInt(initialWaterSupplyInput.value, 10) || 6;
  initialTime = parseInt(initialTimeInput.value, 10) * 60 || 600; 
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";

  waterSupply = initialWaterSupply;

  renderGameBoard();
  updateGameUI();

  startTimer();

  const capitalizedPlayerName = playerName.replace(/\b\w/g, char => char.toUpperCase());
  document.querySelector(".name").textContent = "Player Name: " + capitalizedPlayerName;
}

function startTimer() {
  currentTime = initialTime;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    currentTime--;
    updateTimerDisplay();

    if (currentTime === 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById("timer").textContent = `Time Left: ${formattedTime}`;
}

function gameOver() {
  alert("Game Over!");
}



function renderGameBoard() {
  const boardElement = document.getElementById("gameBoard");
  boardElement.innerHTML = "";
  for (let y = 0; y < boardSize; y++) {
    const rowElement = document.createElement("div");
    rowElement.className = "board-row";

    for (let x = 0; x < boardSize; x++) {
      const cellElement = document.createElement("div");
      cellElement.className = "board-cell";
      cellElement.setAttribute("data-x", x);
      cellElement.setAttribute("data-y", y);

      console.log(gameBoard[y][x]);
      const cellType = gameBoard[y][x];
      setCellBackground(cellElement, cellType, x, y);

      rowElement.appendChild(cellElement);
    }
    boardElement.appendChild(rowElement);
  }
}

function setCellBackground(cellElement, cellType, x, y) {
  if (x === playerPosition.x && y === playerPosition.y) {
    cellElement.style.backgroundImage = "url('Assets/Player.png')";
  } else {
    switch (cellType) {
      case "oasis":
        cellElement.style.backgroundImage = "url('Assets/Oasis.png')";
        break;
      case "mirage":
        cellElement.style.backgroundImage = "url('Assets/Drought.png')";
        break;
      case "sand":
        cellElement.style.backgroundColor = "#e0d8c3";
        break;
      default:
        if (cellType.startsWith("Item")) {
          cellElement.style.backgroundImage = `url('Assets/${cellType}.png')`;
        }
        break;
    }
  }

  if (playerPosition.x === x && playerPosition.y === y) {
    cellElement.style.border = "2px solid red";
  } else {
    cellElement.style.border = "";
  }
}

function updateGameUI() {
  document.getElementById(
    "waterSupply"
  ).textContent = `Water Supply: ${waterSupply}`;
  document.getElementById(
    "foundParts"
  ).textContent = `Parts Found: ${foundParts}`;
}
