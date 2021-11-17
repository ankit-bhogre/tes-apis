const express = require('express');
let app = express.Router();
const quesController = require('../controllers/questions');

app.get('/frontend/data', quesController.frontendDataList);
app.get('/frontend/users/my_asked_ques/:id', quesController.myQuesbyuserId);
app.post('/frontend/asked_ques', quesController.frontendAskedQues);
app.post('/frontend/schedule/appointment', quesController.frontendScheduleAppt);

/////////////// Backend Routes ///////////////////

app.get('/asked/details/:id', quesController.askedQuesDetails);
app.get('/asked/details_by_encrypt_id/:id', quesController.askedQuesDetailsByEncryptId);
app.get('/asked/problems/open', quesController.askedProblemsOpen);
app.get('/asked/request/open', quesController.askedRequestOpen);
app.post('/asked/ques_amt/update', quesController.askedQuesAmtUpdate);
app.post('/asked/assign/service-worker', quesController.askedAssginServiceWorker);

app.get('/', quesController.list);
app.get('/data', quesController.dataList);
app.get('/details/:id', quesController.byId);
app.post('/create', quesController.createQues);
app.post('/update', quesController.updateQues);
app.post('/delete', quesController.deleteQues);

app.get('/categories', quesController.categories);
app.post('/category/create', quesController.createCategory);
app.post('/category/update', quesController.updateCategory);
app.post('/category/delete', quesController.deleteCategory);

module.exports = app