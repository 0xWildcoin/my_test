import { TonConnect } from '@tonconnect/sdk';

// Создаём экземпляр TON Connect
const tonConnect = new TonConnect();

const connectWalletButton = document.getElementById("connectWallet");
const walletAddressDisplay = document.getElementById("walletAddress");

// Обработчик подключения кошелька
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
    } else {
      console.warn("Кошелёк не подключён.");
    }
  } catch (error) {
    console.error("Ошибка подключения кошелька:", error);
  }
});
