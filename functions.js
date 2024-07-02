function movePlayer(direction) {
  let newX = playerPosition.x;
  let newY = playerPosition.y;

  switch (direction) {
    case "left":
      newY = Math.max(0, newY - 1);
      break;
    case "right":
      newY = Math.min(boardSize - 1, newY + 1);
      break;
    case "up":
      newX = Math.max(0, newX - 1);
      break;
    case "down":
      newX = Math.min(boardSize - 1, newX + 1);
      break;
  }

  if (newX !== playerPosition.x || newY !== playerPosition.y) {
    playerPosition = { x: newX, y: newY };
    waterSupply--;
    checkCurrentTile();
    renderGameBoard();
    updateGameUI();
  }
}

function dig() {
  const { x, y } = playerPosition;
  let tile = gameBoard[y][x];

  if (tile === "oasis") {
    waterSupply = 6;
    alert("You've found an oasis! Water supply refilled.");
  } else if (tile === "mirage") {
    alert("This oasis was a mirage.");
  } else if (tile.startsWith("Item")) {
    const partIndex = parts.findIndex((part) => part.id === tile);
    if (!parts[partIndex].found) {
      parts[partIndex].found = true;
      foundParts++;
      alert(`You've found ${tile}!`);
    }
  } else {
    alert("There's nothing here.");
  }

  gameBoard[y][x] = "dug";

  checkGameOver();
  renderGameBoard();
  updateGameUI();
}

function checkCurrentTile() {}

function checkGameOver() {
  if (waterSupply <= 0) {
    alert("Game Over: You've run out of water.");
    initializeGameData();
    startTimer(); 
    document.getElementById("homeScreen").style.display = "block";
    document.getElementById("gameContainer").style.display = "none";
  } else if (foundParts === parts.length) {
    alert("Congratulations, you found all parts and won the game!");
    initializeGameData();
    startTimer(); 
    document.getElementById("homeScreen").style.display = "block";
    document.getElementById("gameContainer").style.display = "none";
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

document.addEventListener("DOMContentLoaded", () => {
  renderGameBoard();
  updateGameUI();
});
