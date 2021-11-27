const eventsTbl = require('../models/eventsMdl');
const eventTopicTbl = require('../models/eventTopicMdl');
const resMsg = require('../helpers/resMsg');
const slugify = require('slugify');
const { Op } = require("sequelize");

const eventController = {
	async frontUpcomingEvents (req, res) {
		try {			
			const resData = await eventsTbl.findAll({
				where: {deletedSts: 0, status: 0},
				attributes: ['eventId', 'eventTitle', 'topicId', 'joinSts', 'joinFee', 'hostBy', 'eventDate', 'eventDuration', 'enablexRoomId', 'eventURL'],
				order: [
					['eventDate', 'asc'],
				]
			});			
			res.status(200).send(resData);
		}catch(error) {
			res.status(200).send({status:"error",message:error.message});
		}
	},
	async fetchAllEvents (req, res) {
		try {			
			const resData = await eventsTbl.findAll({
				where: {deletedSts: 0},
				attributes: ['eventId', 'eventTitle', 'topicId', 'hostBy', 'eventDate', 'enablexRoomId' , 'status']
			});			
			res.status(200).send(resData);
		}catch(error) {
			res.status(200).send({status:"error",message:error.message});
		}
	},
	async byId (req, res) {
		try {
			const eventId = req.params.id;
			const resData = await eventsTbl.findByPk(eventId);
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},
	async fetchActiveEvents (req, res) {
		try {			
			const resData = await eventsTbl.findAll({
				where: {deletedSts: 0, status: 0},
				attributes: ['eventId', 'eventTitle', 'topicId', 'hostBy', 'eventDate', 'enablexRoomId'],
				order: [
					['eventTitle', 'asc'],
				]
			});			
			res.status(200).send(resData);
		}catch(error) {
			res.status(200).send({status:"error",message:error.message});
		}
	},
	async createEvent (req, res) {
		try {
			const eventTitle = req.body.eventTitle;
			const eventSlug = slugify(eventTitle,{replacement: '-', remove: undefined, lower: true, strict: true});
			
			const chkEvent = await eventsTbl.count({where: {eventSlug: eventSlug, deletedSts: 0}});
			if(chkEvent==0){
				
				const eventDate = req.body.eventDate;
				const hostBy = req.body.hostBy;
				const topicId = req.body.topicId;
				
 				const joinFee = req.body.joinFee;
				if(parseInt(joinFee)>0){
					var joinSts = 1;	
				}else{
					var joinSts = 0;
				}
				const eventDuration = req.body.eventDuration;
				
 				const resData = await eventsTbl.create({ topicId: topicId, eventTitle: eventTitle, eventSlug: eventSlug, eventDate: eventDate, hostBy: hostBy, joinSts: joinSts, joinFee: joinFee, eventDuration: eventDuration });
				res.status(200).send({status:"success" ,message:resMsg.success.sMsg12, resData: resData});
			}else{
				res.status(200).send({status:"error", message:resMsg.error.eMsg9});
			}
					
		}catch(error) {
			res.status(400).send({status:"error", message:error.message});
		}
	},
	async updateEvent (req, res) {
		try {
 			const eventId = req.body.eventId;
			const eventTitle = req.body.eventTitle;
			const eventSlug = slugify(eventTitle,{replacement: '-', remove: undefined, lower: true, strict: true});
			const eventDate = req.body.eventDate;
			const hostBy = req.body.hostBy;
			const topicId = req.body.topicId;
			const status = req.body.status;
			const joinFee = req.body.joinFee;
			if(parseInt(joinFee)>0){
				var joinSts = 1;	
			}else{
				var joinSts = 0;
			}
			const eventDuration = req.body.eventDuration;
		
			await eventsTbl.update({ topicId: topicId, eventTitle: eventTitle, eventSlug: eventSlug, eventDate: eventDate, hostBy: hostBy, status: status, joinSts: joinSts, joinFee: joinFee, eventDuration: eventDuration }, {where: {eventId: eventId}});
			res.status(200).send({status:"success", message:resMsg.success.sMsg12});
					
		}catch(error) {
			res.status(400).send({status:"error", message:error.message});
		}
	},
	async removeEvent (req, res){
		try {
 			const eventId = req.body.eventId;
			await eventsTbl.update({ deletedSts: 1 }, {where: {eventId: eventId}})
			res.status(200).send({status:"success", message:resMsg.success.sMsg14});	
		}catch(error) {
			res.status(400).send({status:"error", message:error.message});
		}		
	},
	async eventFetchTopics (req, res) {
		try {			
			const resData = await eventTopicTbl.findAll({
				where: {deletedSts: 0},
				attributes: ['topicId', 'topicName', 'topicSlug', 'status'],
				order: [
					['topicName', 'asc'],
				] 
			});			
			res.status(200).send(resData);
		}catch(error) {
			res.status(200).send({status:"error",message:error.message});
		}
	},
	async eventActiveTopics (req, res) {
		try {			
			const resData = await eventTopicTbl.findAll({
				where: {deletedSts: 0, status: 0},
				attributes: ['topicId', 'topicName', 'topicSlug'],
				order: [
					['topicName', 'asc'],
				] 
			});			
			res.status(200).send(resData);
		}catch(error) {
			res.status(200).send({status:"error",message:error.message});
		}
	},
	async topicById (req, res) {
		try {
			const topicId = req.params.id;
			const resData = await eventTopicTbl.findByPk(topicId);
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},	
	async eventTopicCreate (req, res) {
		try {
			const topicName = req.body.topicName;
			const topicSlug = slugify(topicName,{replacement: '-', remove: undefined, lower: true, strict: true});
			
			const chkCat = await eventTopicTbl.count({where: {topicSlug: topicSlug, deletedSts: 0}});
			if(chkCat==0){
 				const resData = await eventTopicTbl.create({ topicName: topicName, topicSlug: topicSlug });
				res.status(200).send({status:"success", message:resMsg.success.sMsg12, resData: resData});
			}else{
				res.status(200).send({status:"error", message:resMsg.error.eMsg9});
			}
					
		}catch(error) {
			res.status(400).send({status:"error", message:error.message});
		}
	},	
	async eventTopicUpdate (req, res){
		try {
 			const topicId = req.body.topicId;
			const topicName = req.body.topicName;
			const status = req.body.status;
			const topicSlug = slugify(topicName,{replacement: '-', remove: undefined, lower: true, strict: true});
			const chkCat = await eventTopicTbl.count({where: {topicSlug: topicSlug, deletedSts: 0, topicId: {[Op.ne]: topicId} }});
			if(chkCat==0){
 				await eventTopicTbl.update({ topicName: topicName, topicSlug: topicSlug, status: status }, {where: {topicId: topicId}})
				.then( resData => {
					res.status(200).send({status:"success", message:resMsg.success.sMsg6});
				}).catch( error => {
					res.status(200).send({status:"error", message:error.message});
				});
			}else{
				res.status(200).send({status:"error", message:resMsg.error.eMsg9});
			}
		}catch(error) {
			res.status(400).send({status:"error", message:error.message});
		}		
	},
	async eventTopicDelete (req, res){
		try {
 			const topicId = req.body.topicId;
			await eventTopicTbl.update({ deletedSts: '1' }, {where: {topicId: topicId}});
			res.status(200).send({status:"success",message:resMsg.success.sMsg7});
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	}
};

module.exports = eventController;