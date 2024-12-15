// game.js

const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
let currentPlayer = "O"; // Игрок всегда "O"
let gameActive = true;
let gameState = Array(9).fill(null);

// Выигрышные комбинации
const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтальные
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикальные
  [0, 4, 8], [2, 4, 6]             // Диагонали
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

createBoard();

// Обработка клика игрока
function handleCellClick(event) {
  const index = event.target.dataset.index;

  if (!gameActive || gameState[index] || currentPlayer !== "O") return;

  makeMove(index, currentPlayer); // Игрок делает ход

  if (checkWinner()) {
    handleGameEnd("O");
    status.textContent = `Победил игрок O!`;
    gameActive = false; // Останавливаем игру
    return;
  }

  if (!gameState.includes(null)) {
    handleGameEnd("draw");
    status.textContent = "Ничья!";
    gameActive = false; // Останавливаем игру
    return;
  }

  // Ход компьютера
  currentPlayer = "X";
  status.textContent = `Ход: Компьютер (X)`;
  setTimeout(computerMove, 500); // Пауза перед ходом компьютера
}

// Ход компьютера
function computerMove() {
  if (!gameActive) return;

  // Выбираем лучший ход для компьютера
  const bestMove = getBestMove();
  makeMove(bestMove, "X");

  if (checkWinner()) {
    handleGameEnd("X");
    status.textContent = `Победил компьютер (X)!`;
    gameActive = false;
    return;
  }

  if (!gameState.includes(null)) {
    handleGameEnd("draw");
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

function getBestMove() {
  // 1. Если компьютер может выиграть, выбираем этот ход
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === null) {
      gameState[i] = "X";
      if (checkWinner()) {
        gameState[i] = null; // Отменяем временный ход
        return i;
      }
      gameState[i] = null; // Отменяем временный ход
    }
  }

  // 2. Если игрок может выиграть, блокируем его
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === null) {
      gameState[i] = "O";
      if (checkWinner()) {
        gameState[i] = null; // Отменяем временный ход
        return i;
      }
      gameState[i] = null; // Отменяем временный ход
    }
  }

  // 3. Если центр свободен, занимаем его
  if (gameState[4] === null) {
    return 4;
  }

  // 4. Если центр занят, выбираем любой угол
  const corners = [0, 2, 6, 8];
  for (let corner of corners) {
    if (gameState[corner] === null) {
      return corner;
    }
  }

  // 5. Если углы заняты, выбираем любое свободное место
  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === null) {
      return i;
    }
  }
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
