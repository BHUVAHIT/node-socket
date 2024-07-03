// utils/dataFetchers.js

// Fetch live data (dummy example)
async function fetchLiveData() {
    // This function is not needed anymore since we fetch live data via socketService
}

// Fetch data from database
async function fetchDBData() {
    const User = require('../models/userModel');
    return await User.findAll();
}

// Compare data and determine profit or loss
function compareData(liveData, dbData) {
    // Replace with actual comparison logic
    // Example: calculate profit/loss based on live data and db data
    return dbData.map(user => {
        const profitOrLoss = liveData.price - user.purchasePrice;
        return {
            userId: user.id,
            profitOrLoss,
            timestamp: liveData.timestamp
        };
    });
}

module.exports = {
    fetchLiveData,
    fetchDBData,
    compareData
};
