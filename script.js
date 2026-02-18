
const API_KEY = "YOUR_API_KEY";  // 🔹 Replace with your Alpha Vantage API key
let currentSymbol = "";
function getStock() {
    const symbol = document.getElementById("symbolInput").value.trim().toUpperCase();
    if (symbol === "") {
        alert("Please enter a stock symbol.");
        return;
    }
    currentSymbol = symbol;
    fetchStock(symbol);
}
async function fetchStock(symbol) {
    try {
        const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        const stock = data["Global Quote"];
        if (!stock || !stock["05. price"]) {
            document.getElementById("stockData").innerHTML =
                "❌ Invalid symbol or API limit reached.";
            return;
        }
        const price = parseFloat(stock["05. price"]);
        const change = parseFloat(stock["10. change percent"]);
        const changeClass = change >= 0 ? "positive" : "negative";
        document.getElementById("stockData").innerHTML = `
            <h2>${symbol}</h2>
            <p><strong>Price:</strong> $${price.toFixed(2)}</p>
            <p class="${changeClass}">
                <strong>Change:</strong> ${change.toFixed(2)}%
            </p>
        `;
    } catch (error) {
        document.getElementById("stockData").innerHTML =
            "⚠ Error fetching data. Try again.";
    }
}
// Auto refresh every 30 seconds
setInterval(() => {
    if (currentSymbol !== "") {
        fetchStock(currentSymbol);
    }
}, 30000);
