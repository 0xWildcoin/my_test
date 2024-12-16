const usernameDisplay = document.getElementById("username");

// Проверяем, есть ли SDK и данные пользователя
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user || { first_name: "Игрок" };
  usernameDisplay.textContent = `Привет, ${user.first_name}!`;
  tg.expand(); // Расширяем WebApp
} else {
  console.error("Telegram WebApp SDK не загружен.");
  usernameDisplay.textContent = "Привет, Игрок!";
}

console.log("Полный initDataUnsafe:", tg.initDataUnsafe);

// Инициализация статистики
const gameStats = JSON.parse(localStorage.getItem("gameStats")) || {
  totalGames: 0,
  playerWins: 0,
  computerWins: 0,
  draws: 0
};

const statsDisplay = document.getElementById("stats");

// Сохраняем статистику
function saveStats() {
  localStorage.setItem("gameStats", JSON.stringify(gameStats));
}

// Обновляем отображение статистики
function updateStatsDisplay() {
  if (!statsDisplay) return; // Пропускаем, если элемент не найден

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

// Первоначальное отображение статистики
updateStatsDisplay();
