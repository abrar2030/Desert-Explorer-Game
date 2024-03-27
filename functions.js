function movePlayer(direction) {
  let newX = playerPosition.x;
  let newY = playerPosition.y;

  switch (direction) {
    case "up":
      newY = Math.max(0, newY - 1);
      break;
    case "down":
      newY = Math.min(boardSize - 1, newY + 1);
      break;
    case "left":
      newX = Math.max(0, newX - 1);
      break;
    case "right":
      newX = Math.min(boardSize - 1, newX + 1);
      break;
  }

  // Update player position if the new position is different
  if (newX !== playerPosition.x || newY !== playerPosition.y) {
    playerPosition = { x: newX, y: newY };
    waterSupply--; // Decrease water supply with each move
    checkCurrentTile();
  }

  renderGameBoard();
  updateGameUI();
}

function dig() {
  const { x, y } = playerPosition;
  let tile = gameBoard[y][x];

  if (tile === "oasis") {
    waterSupply = 6; // Refill water supply if oasis is found
    alert("You've found an oasis! Water supply refilled.");
  } else if (tile === "mirage") {
    alert("This oasis was a mirage.");
  } else if (tile.startsWith("part")) {
    const partIndex = parts.findIndex((part) => part.id === tile);
    if (!parts[partIndex].found) {
      parts[partIndex].found = true;
      foundParts++;
      alert(`You've found ${tile}!`);
    }
  } else {
    alert("There's nothing here.");
  }

  // Make the tile empty after digging
  gameBoard[y][x] = "dug";

  checkGameOver();
  renderGameBoard();
  updateGameUI();
}

function checkCurrentTile() {
  // This can be expanded based on game needs, e.g., finding clues
}

function checkGameOver() {
  if (waterSupply <= 0) {
    alert("Game Over: You've run out of water.");
    initializeGameData(); // Reset the game
  } else if (foundParts === parts.length) {
    alert("Congratulations, you found all parts and won the game!");
    initializeGameData(); // Optionally reset for a new game
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

// Ensure game board is rendered initially and UI is updated
document.addEventListener("DOMContentLoaded", () => {
  renderGameBoard();
  updateGameUI();
});
