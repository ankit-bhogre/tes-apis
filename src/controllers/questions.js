const askedQuestion = require('../models/askedQuestions');
const askedQuesPayment = require('../models/askedQuestionPayments');
const questions = require('../models/question');
const questionCategory = require('../models/quesCategory');
const serviceWorkersTbl = require('../models/serviceWorker');
const CustFeedbackTbl = require('../models/custFeedback');
const User = require('../models/user')
const sendMail = require('../helpers/emailSender');
const resMsg = require('../helpers/resMsg');
const slugify = require('slugify');
const { Op } = require("sequelize");
const {v4 : uuidv4} = require('uuid');
const productName = process.env.PRODUCT_NAME;

const quesController = {
	async frontendScheduleAppt (req, res){
		try {
 			const scheAppTime = Date.parse(req.body.scheAppTime);
			const askedQuesId = req.body.askedQuesId;
			//const chk = scheAppTime+' --- '+askedQuesId;
			await askedQuestion.update({ consultantSchedSts: 1, consultantSchedTime: scheAppTime }, {where: {askedQuesId: askedQuesId}});
 			res.status(200).send({status:"success", message: 'Your appointment has been confirmed!'});		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async askedAssginServiceWorker (req, res){
		try {
 			const askQuesId = req.body.askedQuesId;
			const wId = req.body.workerId;
			const aa = await askedQuestion.update({ workerId: wId }, {where: {askedQuesId: askQuesId}});
			res.status(200).send({status:"success",message:'Assinged Successfully!'});		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async askedQuesAmtUpdate (req, res){
		try {
 			const askedQuesId = req.body.askedQuesId;
			const setAmt = req.body.setQuesAmt;
			const curDate = new Date();
			const actionPerfom = Date.parse(curDate);
			await askedQuestion.update({ quesAmt: setAmt, ReqActionPerformSts: 1, ReqPerfromedTime: actionPerfom }, {where: {askedQuesId: askedQuesId}});
			res.status(200).send({status:"success",message:'Amount updated!'});		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},	
	async askedQuesDetails (req, res) {
		try {			
			const askedQuesId = req.params.id;
			askedQuestion.hasOne(askedQuesPayment, {foreignKey: 'askedQuesId'});			
			askedQuestion.belongsTo(questions, {foreignKey: 'quesId'});
			askedQuestion.belongsTo(serviceWorkersTbl, {foreignKey: 'workerId'});
			askedQuestion.hasOne(CustFeedbackTbl, {foreignKey: 'askedQuesId'});
			const resData = await askedQuestion.findAll({ 
				where: {askedQuesId: askedQuesId, deletedSts: 0}, attributes: ['askedQuesId', 'userId', 'quesId', 'quesAmt', 'otherQuesTitle', 'assignServiceWorkerSts', 'workerId', 'solvedSts', 'paymentSts', 'askedDate', 'consultantSchedTime'],
				order: [
					['askedQuesId', 'desc'],
				],
				include: [
				{
					model: askedQuesPayment,
					attributes: ['paymentId', 'TxnId'],					
					required: false
				},
				{
					model: questions,
					attributes: ['quesTitle'],					
					required: false
				},
				{
					model: serviceWorkersTbl,
					attributes: ['workerType', 'firstName', 'lastName'],					
					required: false
				},
				{
					model: CustFeedbackTbl,
					attributes: ['customerMsg'],					
					required: false
				}]			
			});		
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},	
	async askedQuesDetailsByEncryptId (req, res) {
		try {			
			const encryptAskedQuesId = req.params.id;
			askedQuestion.hasOne(askedQuesPayment, {foreignKey: 'askedQuesId'});			
			askedQuestion.belongsTo(questions, {foreignKey: 'quesId'});
			askedQuestion.belongsTo(serviceWorkersTbl, {foreignKey: 'workerId'});
			askedQuestion.hasOne(CustFeedbackTbl, {foreignKey: 'askedQuesId'});
			const resData = await askedQuestion.findAll({ 
				where: {encryptAskedQuesId: encryptAskedQuesId, deletedSts: 0}, attributes: ['askedQuesId', 'encryptAskedQuesId', 'userId', 'quesId', 'quesAmt', 'otherQuesTitle', 'assignServiceWorkerSts', 'workerId', 'solvedSts', 'paymentSts', 'askedDate', 'consultantSchedTime'],
				order: [
					['askedQuesId', 'desc'],
				],
				include: [
				{
					model: askedQuesPayment,
					attributes: ['paymentId', 'TxnId'],					
					required: false
				},
				{
					model: questions,
					attributes: ['quesTitle'],					
					required: false
				},
				{
					model: serviceWorkersTbl,
					attributes: ['workerType', 'firstName', 'lastName'],					
					required: false
				},
				{
					model: CustFeedbackTbl,
					attributes: ['customerMsg'],					
					required: false
				}]			
			});		
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},
	async askedProblemsOpen (req, res) {
		try {
			askedQuestion.belongsTo(User, {foreignKey: 'userId'});
			askedQuestion.belongsTo(questions, {foreignKey: 'quesId'});
			const resData = await askedQuestion.findAll({ 
				where: {solvedSts: 0, paymentSts: 1, deletedSts: 0}, attributes: ['askedQuesId', 'userId', 'quesId', 'quesAmt', 'otherQuesTitle', 'askedDate', 'assignServiceWorkerSts', 'workerId'],
				order: [
					['askedQuesId', 'desc'],
				],
				include: [{
					model: User,
					attributes: ['firstName', 'lastName'],					
					required: false
				},
				{
					model: questions,
					attributes: ['quesTitle'],					
					required: false
				}]			
			});		
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async askedRequestOpen (req, res) {
		try {
			askedQuestion.belongsTo(User, {foreignKey: 'userId'});
			const resData = await askedQuestion.findAll({ 
				where: {quesId: 0, paymentSts: 0, deletedSts: 0}, attributes: ['askedQuesId', 'userId', 'quesId', 'quesAmt', 'otherQuesTitle', 'askedDate'],
				order: [
					['askedQuesId', 'desc'],
				],
				include: [{
					model: User,
					attributes: ['firstName', 'lastName'],					
					required: false
				}]			
			});		
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async myQuesbyuserId (req, res) {
		try {			
			const userId = req.params.id;
			askedQuestion.hasOne(askedQuesPayment, {foreignKey: 'askedQuesId'});	
			askedQuestion.hasMany(CustFeedbackTbl, {foreignKey: 'askedQuesId'});		
			askedQuestion.belongsTo(questions, {foreignKey: 'quesId'});
			askedQuestion.belongsTo(serviceWorkersTbl, {foreignKey: 'workerId'});
			const resData = await askedQuestion.findAll({ 
				where: {userId: userId, deletedSts: 0}, attributes: ['askedQuesId', 'encryptAskedQuesId', 'userId', 'quesId', 'quesAmt', 'otherQuesTitle', 'assignServiceWorkerSts', 'workerId', 'solvedSts', 'paymentSts', 'askedDate', 'consultantSchedSts', 'consultantSchedTime', 'ReqActionPerformSts'],
				order: [
					['askedQuesId', 'desc'],
					[CustFeedbackTbl, 'feedbackId', 'desc']
				],
				include: [
				{
					model: askedQuesPayment,
					where: {userId: userId},
					attributes: ['paymentId', 'TxnId'],					
					required: false
				},
				{
					model: questions,
					attributes: ['quesTitle'],					
					required: false
				},
				{
					model: serviceWorkersTbl,
					attributes: ['workerType', 'firstName', 'lastName'],					
					required: false
				},
				{
					model: CustFeedbackTbl,
					where: {userId: userId},
					attributes: ['customerMsg'],					
					required: false
				}]
			});		
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async frontendAskedQues (req, res){
		try {
 			const userId = req.body.userId;
			const quesId = req.body.quesId;
			if(quesId==0){
				var quesTitle = req.body.otherQuesTitle;
				var quesAmt = 0;
			}else{
				var quesTitle = '';
				var quesAmt = req.body.quesAmt;
			}
			const curDate = new Date();
			const askDate = Date.parse(curDate);
			const askMonth = curDate.getMonth()+1;
			const askYear = curDate.getFullYear();
			const EncryptId = uuidv4()+askDate;	
			const askedQuesData = await askedQuestion.create({ encryptAskedQuesId: EncryptId, userId: userId, quesId: quesId, otherQuesTitle: quesTitle, quesAmt: quesAmt, askedDate: askDate, askedMonth: askMonth, askedYear: askYear });
			if(quesId>0){
				/*const askedQuesId = askedQuesData.askedQuesId;				
				const TxnId = req.body.txnId;
				await askedQuesPayment.create({ askedQuesId: askedQuesId, userId: userId, TxnId: TxnId });
				 need to remove this code*/
			}else{
				const adminEmail = 'tns.ankit@gmail.com';
				/*sendMail({
					mTo: adminEmail,
					mSubject: `Question Asked Request`,
					mMessage: `<p>Customer asked a custom question, please see more information into admin panel.</p>
					<p>Thanks,<br />The `+productName+` Team</p>`,
					mMsgBodyFormat: 'html'
				});*/
			}
			res.status(200).send({status:"success", message:'request sent', encryptAskedQuesId: EncryptId });
					
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async list (req, res) {
		try {			
			const resData = await questions.findAll({where: {quesDeletedSts: 0}, attributes: ['quesId', 'catId', 'quesTitle', 'quesCost', 'quesStatus'] });			
			res.send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async byId (req, res) {
		try {
			const quesId = req.params.id;
			const resData = await questions.findByPk(quesId);
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},
	async dataList (req, res) {
		try {
			questionCategory.hasMany(questions, {foreignKey: 'catId'}); // as: 'pendingTags',, constraints: false
			const resData = await questionCategory.findAll({ 
				where: {catDeletedSts: 0}, attributes: ['catId', 'catName', 'catSlug', 'catStatus'],
				order: [
					['catName', 'asc'],
				],
 				include: { 
					model: questions,
					where: {quesDeletedSts: 0}, 
					attributes: ['quesId', 'catId', 'quesTitle', 'quesCost', 'quesStatus'],					
					required: false
				} 
			});
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async frontendDataList (req, res) {
		try {
			questionCategory.hasMany(questions, {foreignKey: 'catId'});
			const resData = await questionCategory.findAll({ 
				where: {catStatus: 0, catDeletedSts: 0}, attributes: ['catId', 'catName', 'catSlug'],
				order: [
					['catName', 'asc'],
				],
 				include: { 
					model: questions,
					where: {quesStatus: 0, quesDeletedSts: 0}, 
					attributes: ['quesId', 'catId', 'quesTitle', 'quesCost'],					
					required: false
				} 
			});
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async createQues (req, res){
		try {
 			const catId = req.body.catId;
			const quesTitle = req.body.quesTitle;	
			const quesCost = req.body.quesCost;
			const resData = await questions.create({ catId: catId, quesTitle: quesTitle, quesCost: quesCost });
			res.status(200).send({status:"success",message:resMsg.success.sMsg8, resData: resData});		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async updateQues (req, res){
		try {
 			const quesId = req.body.quesId;
			const catId = req.body.catId;
			const quesTitle = req.body.quesTitle;
			const quesCost = req.body.quesCost;
			const quesStatus = req.body.quesStatus;
			await questions.update({ catId: catId, quesTitle: quesTitle, quesCost: quesCost, quesStatus: quesStatus }, {where: {quesId: quesId}})
			res.status(200).send({status:"success",message:resMsg.success.sMsg10});	
		}catch(error) {
			res.status(400).send({status:"error test",message:error.message});
		}		
	},
	async deleteQues (req, res){
		try {
 			const quesId = req.body.quesId;
			await questions.update({ quesDeletedSts: 1 }, {where: {quesId: quesId}})
			res.status(200).send({status:"success",message:resMsg.success.sMsg11});	
		}catch(error) {
			res.status(400).send({status:"error test",message:error.message});
		}		
	},
	async categories (req, res) {
		try {			
			const resData = await questionCategory.findAll({where: {catDeletedSts: 0}, attributes: ['catId', 'catName', 'catSlug', 'catStatus'] });			
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async createCategory (req, res){
		try {
 			const catName = req.body.catName;
			const catSlug = slugify(catName,{replacement: '-', remove: undefined, lower: true, strict: true});
			const chkCat = await questionCategory.count({where: {catSlug: catSlug, catDeletedSts: 0}});
			if(chkCat==0){
 				await questionCategory.create({ catName: catName, catSlug: catSlug })
				.then( resData => {
					res.status(200).send({status:"success",message:resMsg.success.sMsg5, resData: resData});
				});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg9});
			}
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async updateCategory (req, res){
		try {
 			const catId = req.body.catId;
			const catName = req.body.catName;
			const catStatus = req.body.catStatus;
			const catSlug = slugify(catName,{replacement: '-', remove: undefined, lower: true, strict: true});
			const chkCat = await questionCategory.count({where: {catSlug: catSlug, catDeletedSts: 0, catId: {[Op.ne]: catId} }});
			if(chkCat==0){
 				await questionCategory.update({ catName: catName, catSlug: catSlug, catStatus: catStatus }, {where: {catId: catId}})
				.then( resData => {
					res.status(200).send({status:"success",message:resMsg.success.sMsg6});
				}).catch( error => {
					res.status(200).send({status:"error",message:error.message});
				});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg9});
			}
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async deleteCategory (req, res){
		try {
 			const catId = req.body.catId;
			await questionCategory.update({ catDeletedSts: '1' }, {where: {catId: catId}});
			res.status(200).send({status:"success",message:resMsg.success.sMsg7});
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	}
};

module.exports = quesController;