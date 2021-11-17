const express = require('express');
let app = express.Router();
const serviceWorkersController = require('../controllers/serviceWorkers');

app.get('/workers', serviceWorkersController.list);
app.get('/worker-types/:id', serviceWorkersController.workerTypeList);

app.post('/worker/verification', serviceWorkersController.verificationCodeSent);
app.post('/worker/signup', serviceWorkersController.webSignup);

app.post('/worker/create', serviceWorkersController.create);
app.post('/worker/update', serviceWorkersController.update);
app.post('/worker/delete', serviceWorkersController.remove);

module.exports = app