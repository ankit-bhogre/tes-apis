const express = require('express')
let app = express.Router()
const usersController = require('../controllers/users')

app.get('/', usersController.list);
app.get('/user/backend/data', usersController.adminData);
app.get('/user/valid/encrypted/:encryptId', usersController.checkValidUserEncryptId);
app.get('/user/:id', usersController.byId);
app.post('/user/check/login', usersController.checkLogin);
app.post('/user/check', usersController.emailCheck);
app.post('/user/verify', usersController.emailVerify);
app.post('/user/create', usersController.create);

app.post('/user/profile/update', usersController.profileUpdate);
app.post('/user/password/update', usersController.passwordUpdate);

app.post('/user/forgot/password', usersController.forgotPassword);
app.post('/user/set/password/valid/link', usersController.setPasswordValidLink);
app.post('/user/set/password', usersController.recoverPassword);

module.exports = app