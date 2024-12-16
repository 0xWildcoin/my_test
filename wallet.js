// Убедитесь, что библиотека доступна
if (typeof TonConnect === "undefined") {
  console.error("TON Connect SDK не загружен.");
} else {
  // Инициализация TON Connect
  const tonConnect = new TonConnect();

  // DOM элементы
  const connectWalletButton = document.getElementById("connectWallet");
  const walletAddressDisplay = document.getElementById("walletAddress");

  // Подключение кошелька
  connectWalletButton.addEventListener("click", async () => {
    try {
      // Открываем окно подключения
      await tonConnect.connectWallet();

      // Получаем данные о подключённом кошельке
      const wallet = tonConnect.wallet;
      if (wallet) {
        const walletAddress = wallet.account.address;
        walletAddressDisplay.textContent = `Кошелёк: ${walletAddress}`;
        console.log("Кошелёк подключён:", walletAddress);
      } else {
        console.warn("Кошелёк не подключён.");
      }
    } catch (error) {
      console.error("Ошибка подключения кошелька:", error);
    }
  });
}
