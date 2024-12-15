const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    board.appendChild(cellElement);
  });
}

function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add("taken");

  if (checkWinner()) {
    status.textContent = `Победил игрок ${currentPlayer}!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes(null)) {
    status.textContent = "Ничья!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Ход: ${currentPlayer}`;
}

function checkWinner() {
  return winningCombinations.some(combination =>
    combi
