const express = require('express');
let app = express.Router();
const authController = require('../../controllers/admin/auth');

app.post('/check/login', authController.checkLogin);
app.post('/profile/password/update', authController.passwordUpdate);
app.get('/sub/details/:id', authController.subAdminDetails);
app.get('/sub/list', authController.subAdminList);
app.post('/sub/create', authController.subAdminCreate);
app.post('/sub/update', authController.subAdminUpdate);
app.post('/sub/delete', authController.subAdminRemove);

module.exports = app