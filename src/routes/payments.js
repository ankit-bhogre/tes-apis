const express = require('express')
let app = express.Router()
const BraintreeController = require('../controllers/payments/Braintree')

app.get('/client_token', BraintreeController.getClientToken);
app.post('/received', BraintreeController.receivedPayment);
app.post('/success_entry', BraintreeController.successTransEntry);

module.exports = app