const express = require('express');
let app = express.Router();
const mastersController = require('../controllers/masters');

app.get('/worker-types', mastersController.workerTypesList);

module.exports = app