const express = require('express');
let app = express.Router();
const cmsController = require('../controllers/cms');

app.get('/front/page/home/all-sections-data', cmsController.pageHomeAllSectionsData);
app.get('/details/:id', cmsController.byId);
app.get('/details/page/:pageName', cmsController.byPageName);
app.get('/section/:page/:section', cmsController.sectionWiseData);
app.post('/create', cmsController.createCms);
app.post('/update', cmsController.updateCms);
app.post('/remove', cmsController.removeCms);
app.post('/service/update', cmsController.updateService);
app.post('/section-heading/update', cmsController.updateSectionHeading);
app.post('/section-multi-services/update', cmsController.updateMultiService);
app.post('/section-about-us/update', cmsController.updateAboutUs);
app.post('/how-it-works/update', cmsController.updateHowItWorks);

module.exports = app