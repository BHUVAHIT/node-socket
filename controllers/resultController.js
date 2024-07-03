 const staticData = {
    "XAU/USD": { "buyPrice": 2300 },
    "EUR/USD": { "buyPrice": 1.1 },
    "BTC/USD": { "buyPrice": 30000 },
    "WTI/USD": { "buyPrice": 70 },
    "XAG/USD": { "buyPrice": 25 },
    "XBR/USD": { "buyPrice": 75 }
};

// Function to calculate profit or loss
function calculateProfitOrLoss(symbol, livePrice) {
    const staticBuyPrice = staticData[symbol]?.buyPrice; 
    if (staticBuyPrice === undefined) {
        console.warn(`Symbol ${symbol} not found in static data.`);
        return null;
    }

    const profitOrLoss = livePrice - staticBuyPrice;
    return { symbol, livePrice, staticBuyPrice, profitOrLoss };
}

exports.calculateAndSendResult = async (req, res) => {
    try {
        const { symbol, livePrice } = req.body;

        if (!staticData[symbol]) {
            return res.status(404).json({ success: false, error: `Symbol ${symbol} not found in static data.` });
        }

        const resultData = calculateProfitOrLoss(symbol, livePrice);
        if (resultData) {
            res.json({ success: true, data: resultData });
        } else {
            res.status(404).json({ success: false, error: `Symbol ${symbol} not found in static data.` });
        }
    } catch (error) {
        console.error('Error in calculateAndSendResult:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};
