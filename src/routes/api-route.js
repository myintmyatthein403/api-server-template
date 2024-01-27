const express = require('express');
const router = express.Router();

const testRoute = require('./test-route');
const userRoute = require('./user-route');
const authRoute = require('./auth-route');

router.get('/connection', (req, res) => {
    res.status(200).json({
        message: 'Connection test successful.'
    })
})

router.use('/test',  testRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);

module.exports = router;