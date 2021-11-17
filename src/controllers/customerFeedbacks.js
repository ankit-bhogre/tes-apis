const CustFeedbackTbl = require('../models/custFeedback');
const resMsg = require('../helpers/resMsg');
const slugify = require('slugify');
const { Op } = require("sequelize");

const custFbksController = {
	async list (req, res) {
		try {			
			const resData = await CustFeedbackTbl.findAll({where: {deletedSts: 0}, attributes: ['feedbackId', 'userId', 'userId', 'givenDate', 'status'] });			
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async byId (req, res) {
		try {
			const feedbackId = req.params.id;
			const resData = await CustFeedbackTbl.findByPk(feedbackId);
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},	
	async create (req, res) {
		try {
 			const userId = req.body.userId;
			const askedQuesId = req.body.askedQuesId;
			const customerMsg = req.body.feedbackTxt;
			const curDate = new Date();
			const givenDate = Date.parse(curDate);
			await CustFeedbackTbl.create({ userId: userId, askedQuesId: askedQuesId, customerMsg: customerMsg, givenDate: givenDate, status: 1 })
			.then( resData => {
				res.status(200).send({status:"success",message:resMsg.success.sMsg12});
			});		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async update (req, res) {
		try {
 			const feedbackId = req.body.feedbackId;
			const couponCode = req.body.couponCode;
			const couponCodeSlug = slugify(couponCode,{replacement: '-', remove: undefined, lower: true, strict: true});
			const chkRow = await CustFeedbackTbl.count({where: {couponCodeSlug: couponCodeSlug, deletedSts: 0, feedbackId: {[Op.ne]: feedbackId} }});
			if(chkRow==0){				
				const discountPer = req.body.discountPer;
				const expireDate = req.body.expireDate;
				const status = req.body.status;
				await CustFeedbackTbl.update({ couponCode: couponCode, couponCodeSlug: couponCodeSlug, discountPer: discountPer, expireDate: expireDate, status: status }, {where: {feedbackId: feedbackId}});
				res.status(200).send({status:"success",message:resMsg.success.sMsg13});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg10});
			}		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async remove (req, res){
		try {
 			const feedbackId = req.body.feedbackId;
			await CustFeedbackTbl.update({ deletedSts: 1 }, {where: {feedbackId: feedbackId}})
			res.status(200).send({status:"success",message:resMsg.success.sMsg14});	
		}catch(error) {
			res.status(400).send({status:"error test",message:error.message});
		}		
	}
};

module.exports = custFbksController;