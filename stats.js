// stats.js

const statsDisplay = document.getElementById("stats");

if (!statsDisplay) {
  console.error("Элемент с ID 'stats' не найден в DOM.");
} else {
  statsDisplay.innerHTML = `
    <p>Всего игр: ${gameStats.totalGames}</p>
    <p>Победы игрока: ${gameStats.playerWins}</p>
    <p>Победы компьютера: ${gameStats.computerWins}</p>
    <p>Ничьи: ${gameStats.draws}</p>
  `;
}

// Инициализация статистики
const gameStats = JSON.parse(localStorage.getItem("gameStats")) || {
  totalGames: 0,
  playerWins: 0,
  computerWins: 0,
  draws: 0
};

// Сохраняем статистику
function saveStats() {
  localStorage.setItem("gameStats", JSON.stringify(gameStats));
}

// Обновляем отображение статистики
function updateStatsDisplay() {
  statsDisplay.innerHTML = `
    <p>Всего игр: ${gameStats.totalGames}</p>
    <p>Победы игрока: ${gameStats.playerWins}</p>
    <p>Победы компьютера: ${gameStats.computerWins}</p>
    <p>Ничьи: ${gameStats.draws}</p>
  `;
}

// Обновляем статистику при завершении игры
function handleGameEnd(result) {
  gameStats.totalGames++;
  if (result === "O") gameStats.playerWins++;
  if (result === "X") gameStats.computerWins++;
  if (result === "draw") gameStats.draws++;
  saveStats();
  updateStatsDisplay();
}
