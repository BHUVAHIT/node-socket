// const http = require('http');
// const WebSocket = require('ws');

// // Create an HTTP server
// const server = http.createServer();

// // Create a WebSocket server instance
// const wss = new WebSocket.Server({ server });

// const staticData = {
//     "XAU/USD": { "buyPrice": 2300 },
//     "EUR/USD": { "buyPrice": 1.1 },
//     "BTC/USD": { "buyPrice": 30000 },
//     "WTI/USD": { "buyPrice": 70 },
//     "XAG/USD": { "buyPrice": 25 },
// };



// // Function to calculate profit or loss
// function calculateProfitOrLoss(symbol, livePrice) {
//     // Your logic to calculate profit or loss
//     return {
//         symbol: symbol,
//         livePrice: livePrice,
//         profitOrLoss: livePrice - 100 // Example calculation
//     };
// }






// // WebSocket server logic
// wss.on('connection', function connection(ws) {
//     console.log('Client connected');

//     // Replace with your WebSocket URL
//     const socket = new WebSocket('wss://ws.twelvedata.com/v1/quotes/price?apikey=d30ef60975e44c47a04f2d50b8c1f3ad');

//     socket.on('open', function open() {
//         console.log('Connected to WebSocket server');

//         // Subscribe to symbols
//         const subscriptionMessage = {
//             action: 'subscribe',
//             params: {
//                 symbols: 'EUR/USD,XAU/USD,BTC/USD,WTI/USD,XBR/USD,XAG/USD'
//             }
//         };

//         socket.send(JSON.stringify(subscriptionMessage));
//     });

//     socket.on('message', function incoming(data) {
//         // console.log('Received message from WebSocket server:', data);

//         try {
//             const jsonData = JSON.parse(data);
//             // console.log('Parsed data:', jsonData);

//             if (jsonData.event === 'price') {
//                 const symbol = jsonData.symbol;
//                 const livePrice = jsonData.price;

//                 // console.log(`Live price for ${symbol}: ${livePrice}`);

//                 const resultData = calculateProfitOrLoss(symbol, livePrice);


//                 ws.send(JSON.stringify(resultData));
//             }
//         } catch (error) {
//             console.error('Error parsing JSON:', error);
//         }
//     });

//     socket.on('close', function close() {
//         console.log('Disconnected from WebSocket server');
//     });

//     ws.on('message', function incoming(message) {
//         console.log('received: %s', message);
//     });

//     ws.on('close', () => {
//         console.log('Client disconnected');
//     });
// });

// // Start the HTTP server
// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//     console.log(`WebSocket server is running on port ${PORT}`);
// });









const WebSocket = require('ws');

const staticData = {
    "XAU/USD": { "buyPrice": 100 },
    "EUR/USD": { "buyPrice": 1.1 },
    "BTC/USD": { "buyPrice": 30000 },
    "WTI/USD": { "buyPrice": 70 },
    "XAG/USD": { "buyPrice": 25 },
};



// Function to calculate profit or loss
function calculateProfitOrLoss(symbol, livePrice) {
    const buyPrice = staticData[symbol]?.buyPrice;
    if (buyPrice !== undefined) {
        const profitOrLoss = livePrice - buyPrice;
        return {
            symbol: symbol,
            livePrice: livePrice,
            buyPrice: buyPrice,
            profitOrLoss: profitOrLoss
        };
    } else {
        return {
            symbol: symbol,
            livePrice: livePrice,
            error: "Buy price not found"
        };
    }
}
function WebSocketServer(server)  {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', function connection(ws) {
        console.log('Client connected');

        const socket = new WebSocket('wss://ws.twelvedata.com/v1/quotes/price?apikey=d30ef60975e44c47a04f2d50b8c1f3ad');
        

        socket.on('open', function open() {
            console.log('Connected to WebSocket server');

            const subscriptionMessage = {
                action: 'subscribe',
                params: {
                    symbols: 'EUR/USD,XAU/USD,BTC/USD,WTI/USD,XBR/USD,XAG/USD'
                }
            };

            socket.send(JSON.stringify(subscriptionMessage));
        });

        socket.on('message', function incoming(data) {
            try {
                const jsonData = JSON.parse(data);

                if (jsonData.event === 'price') {
                    const symbol = jsonData.symbol;
                    const livePrice = jsonData.price;
                    const resultData = calculateProfitOrLoss(symbol, livePrice);


                    console.log("111111-resultData",resultData)

                    // Use ws (WebSocket instance) to send data back to the client
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify(resultData));
                    }
                }
            } catch (error) {
                console.error('Error parsing JSON:', error);
            }
        });

        socket.on('close', function close() {
            console.log('Disconnected from WebSocket server');
        });

        // Corrected usage of ws (WebSocket instance)
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });
};

module.exports = WebSocketServer;




