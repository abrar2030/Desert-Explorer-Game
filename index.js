document.addEventListener("DOMContentLoaded", () => {
  // Attach event listeners to UI controls upon document load
  document.getElementById("startGame").addEventListener("click", startGame);
  document
    .getElementById("moveUp")
    .addEventListener("click", () => movePlayer("up"));
  document
    .getElementById("moveDown")
    .addEventListener("click", () => movePlayer("down"));
  document
    .getElementById("moveLeft")
    .addEventListener("click", () => movePlayer("left"));
  document
    .getElementById("moveRight")
    .addEventListener("click", () => movePlayer("right"));
  document.getElementById("dig").addEventListener("click", dig);
});

function startGame() {
  const playerNameInput = document.getElementById("playerName");
  const initialWaterSupplyInput = document.getElementById("initialWaterSupply");

  // Example usage, could be extended for multiplayer setup or additional settings
  const playerName = playerNameInput.value || "Player";
  const initialWaterSupply = parseInt(initialWaterSupplyInput.value, 10) || 6;

  // Hide home screen and display the game container
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";

  // Initialize the game with player-specific settings
  waterSupply = initialWaterSupply; // Set the initial water supply
  // Call any necessary initialization functions from arrays.js or functions.js here

  // Render initial game state
  renderGameBoard();
  updateGameUI();
}

function renderGameBoard() {
  const boardElement = document.getElementById("gameBoard");
  boardElement.innerHTML = ""; // Clear the board for fresh rendering

  for (let y = 0; y < boardSize; y++) {
    const rowElement = document.createElement("div");
    rowElement.className = "board-row";

    for (let x = 0; x < boardSize; x++) {
      const cellElement = document.createElement("div");
      cellElement.className = "board-cell";
      cellElement.setAttribute("data-x", x);
      cellElement.setAttribute("data-y", y);

      // Style or add content to cellElement based on gameBoard state
      const cellType = gameBoard[y][x];
      setCellBackground(cellElement, cellType, x, y);

      rowElement.appendChild(cellElement);
    }
    boardElement.appendChild(rowElement);
  }
}

function setCellBackground(cellElement, cellType, x, y) {
  // Example of setting background based on cell type; adjust paths as necessary
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
      // Handle parts or other special cells
      if (cellType.startsWith("part")) {
        cellElement.style.backgroundImage = `url('Assets/${cellType}.png')`;
      }
      break;
  }

  // Highlight player's position
  if (playerPosition.x === x && playerPosition.y === y) {
    cellElement.style.border = "2px solid red";
  } else {
    cellElement.style.border = "";
  }
}

function updateGameUI() {
  // Update dynamic elements like water supply and parts found
  document.getElementById(
    "waterSupply"
  ).textContent = `Water Supply: ${waterSupply}`;
  document.getElementById(
    "foundParts"
  ).textContent = `Parts Found: ${foundParts}`;
}
