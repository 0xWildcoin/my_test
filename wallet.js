const connectWalletButton = document.getElementById("connectWallet");
const walletAddressDisplay = document.getElementById("walletAddress");

// Проверяем наличие Telegram WebApp
if (window.Telegram && window.Telegram.WebApp) {
  const tg = window.Telegram.WebApp;

  // Подключение кошелька
  connectWalletButton.addEventListener("click", async () => {
    try {
      // Проверяем, доступен ли Telegram кошелёк
      if (tg.initDataUnsafe?.wallet) {
        const wallet = tg.initDataUnsafe.wallet;

        // Отображаем адрес кошелька
        walletAddressDisplay.textContent = `Кошелёк: ${wallet}`;
        console.log("Кошелёк подключён:", wallet);
      } else {
        alert("Кошелёк Telegram недоступен.");
        console.warn("Кошелёк Telegram не найден.");
      }
    } catch (error) {
      console.error("Ошибка подключения кошелька:", error);
      alert("Не удалось подключить кошелёк.");
    }
  });
} else {
  console.error("Telegram WebApp SDK не загружен.");
  alert("Пожалуйста, откройте приложение через Telegram Web App.");
}