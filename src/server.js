const express = require('express');
const configureMiddleware = require('./middlewares/middleware')
const connectToDatabase = require('./database');
const setupRoutes = require('./routes');

require('dotenv').config()

const startServer = (app) => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.info(`Server is running at the port ${PORT}...`);
    })
}

const setupServer = () => {
    const app = express();
    configureMiddleware(app);
    connectToDatabase(app);
    setupRoutes(app);
    startServer(app);
}

module.exports = setupServer;