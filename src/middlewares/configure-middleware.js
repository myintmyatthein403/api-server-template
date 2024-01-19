const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const configureMiddleware = (app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use(cookieParser());
    app.use(morgan('combined'));
    app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
};

module.exports = configureMiddleware;