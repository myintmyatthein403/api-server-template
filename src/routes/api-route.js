const express = require('express');
const router = express.Router();

const testRoute = require('./test-route');

router.get('/connection', (req, res) => {
    res.status(200).json({
        message: 'Connection test successful.'
    })
})

router.use('/test',  testRoute);

module.exports = router;