// Инициализация TON Connect
const tonConnect = new TonConnect();

// DOM элементы
const connectWalletButton = document.getElementById("connectWallet");
const walletAddressDisplay = document.getElementById("walletAddress");

// Подключение кошелька
connectWalletButton.addEventListener("click", async () => {
  try {
    // Открываем окно выбора кошелька
    await tonConnect.connectWallet();

    // Получаем данные о подключённом кошельке
    const wallet = tonConnect.wallet;
    if (wallet) {
      const walletAddress = wallet.account.address;
      walletAddressDisplay.textContent = `Кошелёк: ${walletAddress}`;
      console.log("Кошелёк подключён:", walletAddress);

      // Проверяем баланс
      checkWalletBalance(walletAddress);
    } else {
      console.warn("Кошелёк не подключён.");
    }
  } catch (error) {
    console.error("Ошибка подключения кошелька:", error);
  }
});

// Функция проверки баланса
async function checkWalletBalance(walletAddress) {
  const client = new TonClient({
    endpoint: "https://toncenter.com/api/v2/jsonRPC"
  });

  try {
    const balance = await client.getBalance(walletAddress);
    console.log(`Баланс кошелька: ${(balance / 1e9).toFixed(2)} TON`);
    alert(`Баланс кошелька: ${(balance / 1e9).toFixed(2)} TON`);
  } catch (error) {
    console.error("Ошибка получения баланса:", error);
  }
}
