const express = require('express');
let app = express.Router();
const couponsController = require('../controllers/coupons');

app.get('/coupons', couponsController.list);
app.get('/coupon/:id', couponsController.byId);
app.post('/coupon/create', couponsController.create);
app.post('/coupon/update', couponsController.update);
app.post('/coupon/remove', couponsController.remove);

module.exports = app