const express = require('express')
let app = express.Router()
const categoriesController = require('../controllers/categories')

app.get('/', categoriesController.list);
app.get('/:id', categoriesController.byId);
app.get('/category/create', categoriesController.create);

module.exports = app