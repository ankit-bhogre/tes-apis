const express = require('express');
let app = express.Router();
const eventController = require('../controllers/events');

app.get('/events', eventController.fetchAllEvents);
app.get('/events/front/upcoming/:userId', eventController.frontUpcomingEvents);
app.get('/events/active', eventController.fetchActiveEvents);
app.get('/events/:id', eventController.byId);
app.post('/events/create', eventController.createEvent);
app.post('/events/update', eventController.updateEvent);
app.post('/events/remove', eventController.removeEvent);

app.get('/events/admin/topics', eventController.eventFetchTopics);
app.get('/events/active/topics', eventController.eventActiveTopics);
app.get('/events/topic/:id', eventController.topicById);
app.post('/events/topic/create', eventController.eventTopicCreate);
app.post('/events/topic/update', eventController.eventTopicUpdate);
app.post('/events/topic/delete', eventController.eventTopicDelete);

module.exports = app