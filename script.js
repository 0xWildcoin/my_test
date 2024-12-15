document.addEventListener("DOMContentLoaded", () => {
    const tg = window.Telegram.WebApp;
    tg.expand();

    document.getElementById("send").addEventListener("click", async () => {
        const response = await fetch("http://localhost:5000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username: tg.initDataUnsafe.user.first_name })
        });

        const data = await response.json();
        document.getElementById("greeting").innerText = data.message;
    });
});
