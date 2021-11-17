const express = require('express');
const app = express();
var cors = require('cors');
const blogs = require('./src/routes/blogs')
const users = require('./src/routes/users')
const questions = require('./src/routes/questions')
const suppliers = require('./src/routes/suppliers')
const categories = require('./src/routes/categories')
const bodyParser = require('body-parser');
const verifyJwtToken = require('./src/helpers/verifyJwtToken');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',users)
app.use('/questions',questions)
app.use('/suppliers',verifyJwtToken,suppliers)
app.use('/categories',categories)
app.use('/blogs',blogs)

module.exports = app