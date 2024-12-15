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

  let bestScore = -Infinity;
  let bestMove = null;

  for (let i = 0; i < gameState.length; i++) {
    if (gameState[i] === null) {
      gameState[i] = "X"; // Компьютер делает ход
      const score = minimax(gameState, 0, false); // Оцениваем ход
      gameState[i] = null; // Отменяем ход
      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

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
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
      return gameState[a]; // Возвращает "X" или "O"
    }
  }
  return null; // Никто не победил
}

function minimax(gameState, depth, isMaximizing) {
  const winner = checkWinnerForMinimax();
  if (winner === "X") return 10 - depth; // Компьютер выигрывает
  if (winner === "O") return depth - 10; // Игрок выигрывает
  if (!gameState.includes(null)) return 0; // Ничья

  if (isMaximizing) {
    let maxEval = -Infinity;
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === null) {
        gameState[i] = "X"; // Компьютер делает ход
        const evaluation = minimax(gameState, depth + 1, false);
        gameState[i] = null; // Отменяем ход
        maxEval = Math.max(maxEval, evaluation);
      }
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (let i = 0; i < gameState.length; i++) {
      if (gameState[i] === null) {
        gameState[i] = "O"; // Игрок делает ход
        const evaluation = minimax(gameState, depth + 1, true);
        gameState[i] = null; // Отменяем ход
        minEval = Math.min(minEval, evaluation);
      }
    }
    return minEval;
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
