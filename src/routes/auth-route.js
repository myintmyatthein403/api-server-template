const router = require('express').Router();
const { logIn, signUp } = require('./../controllers/login-controller');

router.post('/register', signUp);
router.post('/login', logIn);

module.exports = router;