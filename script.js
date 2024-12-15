const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "O"; // Игрок всегда "O"
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

// Создаём игровое поле
function createBoard() {
  board.innerHTML = "";
  gameState.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.dataset.index = index;
    board.appendChild(cellElement);
  });
}

// Обработка клика игрока
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (!gameActive || gameState[index] || currentPlayer !== "O") return;

  makeMove(index, currentPlayer); // Игрок делает ход

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

  // Ход компьютера
  currentPlayer = "X";
  status.textContent = `Ход: Компьютер (X)`;
  setTimeout(computerMove, 500); // Даем небольшую паузу перед ходом компьютера
}

// Ход компьютера
function computerMove() {
  if (!gameActive) return;

  // Выбираем случайную свободную клетку
  const freeCells = gameState
    .map((value, index) => (value === null ? index : null))
    .filter(index => index !== null);

  const randomIndex = freeCells[Math.floor(Math.random() * freeCells.length)];
  makeMove(randomIndex, "X");

  if (checkWinner()) {
    status.textContent = `Победил игрок X (компьютер)!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes(null)) {
    status.textContent = "Ничья!";
    gameActive = false;
    return;
  }

  currentPlayer = "O";
  status.textContent = `Ход: Игрок (O)`;
}

// Логика хода
function makeMove(index, player) {
  gameState[index] = player;
  const cell = board.querySelector(`[data-index='${index}']`);
  cell.textContent = player;
  cell.classList.add("taken");
}

// Проверка на победу
function checkWinner() {
  return winningCombinations.some(combination =>
    combination.every(index => gameState[index] === currentPlayer)
  );
}

// Сброс игры
function resetGame() {
  currentPlayer = "O";
  gameActive = true;
  gameState.fill(null);
  status.textContent = `Ход: Игрок (O)`;
  createBoard();
}

board.addEventListener("click", handleCellClick);
resetButton.addEventListener("click", resetGame);

// Инициализация
createBoard();
