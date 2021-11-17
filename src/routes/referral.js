const express = require('express');
let app = express.Router();
const referralController = require('../controllers/referrals');

app.post('/friends/invites', referralController.invitesFriends);

module.exports = app