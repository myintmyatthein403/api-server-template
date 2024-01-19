const express = require('express');
const apiRoutes = require('./routes/api-route');

const setupRoutes = (app) => {
    app.use('/api/v1', apiRoutes);
};

module.exports = setupRoutes;