const express = require('express');
const router = express.Router();
const GenericService = require('../services/generic-service');
const {
    create,
    find,
    findOne,
    update,
    deleteItem
} = require('./../controllers/generic-controller');

// Initialize the GenericService with your Mongoose model
const testModel = require('./../models/test-model'); // Replace with your actual model

// Routes
router.post('/', async (req, res) => create(req, res, testModel, GenericService));
router.get('/', async (req, res) => find(req, res, testModel, GenericService));
router.get('/:id', async (req, res) => findOne(req, res, testModel, GenericService));
router.put('/:id', async (req, res) => update(req, res, testModel, GenericService));
router.delete('/:id', async (req, res) => deleteItem(req, res, testModel, GenericService));

module.exports = router;
