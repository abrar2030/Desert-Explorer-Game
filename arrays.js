const boardSize = 5;
let gameBoard = [];
let parts = [
  { id: "part1", found: false },
  { id: "part2", found: false },
  { id: "part3", found: false },
];
let oases = [
  { isMirage: false },
  { isMirage: false },
  { isMirage: false },
  { isMirage: true }, // One mirage among the oases
];
let playerPosition = { x: 2, y: 2 };
let waterSupply = 6;
let foundParts = 0;

function initializeGameData() {
  playerPosition = { x: 2, y: 2 };
  waterSupply =
    parseInt(document.getElementById("initialWaterSupply").value) || 6;
  foundParts = 0;
  gameBoard = createInitialBoard();
  displayGameContainer();
}

function createInitialBoard() {
  let board = new Array(boardSize)
    .fill(null)
    .map(() => new Array(boardSize).fill("sand"));

  // Randomly place oases, ensuring at least one is a mirage
  oases.forEach((oasis) => {
    let x, y;
    do {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    } while (board[y][x] !== "sand"); // Ensure we're placing on a sand tile
    board[y][x] = oasis.isMirage ? "mirage" : "oasis";
  });

  // Randomly place parts
  parts.forEach((part) => {
    let x, y;
    do {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    } while (board[y][x] !== "sand"); // Ensure we're placing on a sand tile
    board[y][x] = part.id;
  });

  return board;
}

function displayGameContainer() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
}

// Call initializeGameData when the script is loaded
initializeGameData();
