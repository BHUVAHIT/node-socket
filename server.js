const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const WebSocketServer = require('./websocketServer'); // Import WebSocket server

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/test', (req, res) => {
    console.log("This is a test endpoint");
    res.send("Server is running");
});

app.use('/api', require('./routes/userRoutes'));

// Temporarily comment out or remove database synchronization
/*
const sequelize = require('./config/database');
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.log('Error syncing database', err));
*/

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Start the WebSocket server
WebSocketServer(server);
