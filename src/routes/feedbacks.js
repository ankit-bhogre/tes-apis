const express = require('express');
let app = express.Router();
const custFbksController = require('../controllers/customerFeedbacks');

app.get('/feedbacks', custFbksController.list);
app.get('/feedback/:id', custFbksController.byId);
app.post('/feedback/create', custFbksController.create);

module.exports = app 