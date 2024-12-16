// Подключение TON Connect SDK
const tonConnect = new TonConnect();

// DOM элементы
const connectWalletButton = document.getElementById("connectWallet");
const walletAddressDisplay = document.getElementById("walletAddress");

// Обработчик кнопки подключения
connectWalletButton.addEventListener("click", async () => {
  try {
    // Подключаем кошелёк
    await tonConnect.connectWallet();

    // Получаем адрес кошелька
    const wallet = tonConnect.wallet;
    if (wallet) {
      const walletAddress = wallet.account.address;
      walletAddressDisplay.textContent = `Кошелёк: ${walletAddress}`;
      console.log("Кошелёк подключён:", walletAddress);
    } else {
      walletAddressDisplay.textContent = "Кошелёк не подключён";
      console.warn("Кошелёк не подключён.");
    }
  } catch (error) {
    console.error("Ошибка подключения кошелька:", error);
    alert("Не удалось подключить кошелёк. Попробуйте снова.");
  }
});
