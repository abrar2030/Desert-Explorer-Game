const boardSize = 5;
let gameBoard = [];
let parts = [
  { id: "Item 1", found: false },
  { id: "Item 2", found: false },
  { id: "Item 3", found: false },
];

let oases = [
  { isMirage: false },
  { isMirage: false },
  { isMirage: false },
  { isMirage: true },
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

  oases.forEach((oasis) => {
    let x, y;
    do {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    } while (board[y][x] !== "sand");
    board[y][x] = oasis.isMirage ? "mirage" : "oasis";
  });

  parts.forEach((part) => {
    let x, y;
    do {
      x = Math.floor(Math.random() * boardSize);
      y = Math.floor(Math.random() * boardSize);
    } while (board[y][x] !== "sand");
    board[y][x] = part.id;
  });

  return board;
}

function displayGameContainer() {
  document.getElementById("homeScreen").style.display = "none";
  document.getElementById("gameContainer").style.display = "block";
}

