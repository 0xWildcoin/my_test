const board = document.getElementById("board");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");
const scoreDisplay = document.getElementById("score");
const usernameDisplay = document.getElementById("username");

let tg = null; // Объявляем глобально
let currentPlayer = "O"; // Игрок всегда "O"
let gameActive = true;
let gameState = Array(9).fill(null);
let userScore = 0;

// Проверка на наличие Telegram WebApp SDK
if (window.Telegram && window.Telegram.WebApp) {
  tg = window.Telegram.WebApp;

  console.log("WebApp инициализирован:", tg);
  console.log("initData:", tg.initData);
  console.log("initDataUnsafe:", tg.initDataUnsafe);

  // Проверка данных пользователя
  const user = tg.initDataUnsafe?.user;
  if (user) {
    console.log("Пользователь:", user);
    usernameDisplay.textContent = `Привет, ${user.first_name || "Игрок"}!`;
  } else {
    console.warn("Данные пользователя не получены.");
  }

  tg.expand();
} else {
  console.error("Telegram WebApp SDK не загружен. Запустите приложение через Telegram.");
  alert("Пожалуйста, откройте это приложение через Telegram бот.");
  usernameDisplay.textContent = "Привет, Игрок!";
}

// Проверяем, есть ли сохранённые очки для пользователя
const user = tg?.initDataUnsafe?.user || { id: "guest", first_name: "Игрок" };
const userId = user?.id || "guest";
const savedScores = JSON.parse(localStorage.getItem("scores")) || {};
userScore = savedScores[userId] || 0;

// Обновляем отображение очков
function updateScoreDisplay() {
  scoreDisplay.textContent = `Ваши очки: ${userScore}`;
}

// Сохраняем очки
function saveScore() {
  savedScores[userId] = userScore;
  localStorage.setItem("scores", JSON.stringify(savedScores));
}

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
    userScore++;
    saveScore(); // Сохраняем очки
    updateScoreDisplay();
    status.textContent = `Победил игрок ${currentPlayer}! (+1 очко)`;
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
updateScoreDisplay();
createBoard();
