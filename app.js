const express = require('express');
const app = express();
var cors = require('cors');

const users = require('./src/routes/users');
const cmsys = require('./src/routes/cms');
const questions = require('./src/routes/questions');
const serviceWorkers = require('./src/routes/serviceWorkers');
const referrals = require('./src/routes/referral');
const coupons = require('./src/routes/coupons');
const masters = require('./src/routes/masters');
const feedbacks = require('./src/routes/feedbacks');
/*const payments = require('./src/routes/payments');
const enablexApi = require('./src/routes/enablexApi');
const events = require('./src/routes/events');*/
//const categories = require('./src/routes/categories');

//const admins = require('./src/routes/admin/auth');

const bodyParser = require('body-parser');
const verifyJwtToken = require('./src/helpers/verifyJwtToken');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/',users);
app.use('/cms',cmsys);
app.use('/questions',questions); //app.use('/questions',verifyJwtToken,questions);
app.use('/service',serviceWorkers);
app.use('/referral',referrals);
app.use('/',coupons);
app.use('/master',masters);
app.use('/',feedbacks);
/*app.use('/payments',payments);
app.use('/enablexapi',enablexApi);
app.use('/',events);*/
//app.use('/categories',categories);

//app.use('/admin',admins);

module.exports = app