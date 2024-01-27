const router = require('express').Router();
const userModel = require('./../models/user-model');
const GenericService = require('./../services/generic-service');

const {
    create,
    find
} = require('./../controllers/generic-controller');
const {ensureAuth} = require("../middlewares/auth-middleware");

router.post('/', async(req, res) => create(req, res, userModel, GenericService));
router.get('/', ensureAuth, async(req, res) => find(req, res, userModel, GenericService));

module.exports = router;