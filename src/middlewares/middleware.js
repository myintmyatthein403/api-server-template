const configureMiddleware = require('./configure-middleware');

module.exports = (app) => {
    configureMiddleware(app);
};
