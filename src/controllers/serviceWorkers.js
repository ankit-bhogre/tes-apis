const serviceWorkersTbl = require('../models/serviceWorker');
const resMsg = require('../helpers/resMsg');
const {v4 : uuidv4} = require('uuid');
const { Op } = require("sequelize");

const serviceWorkersController = {
	async verificationCodeSent (req, res) {
		try {
			const emailAddress = req.body.email;
			const chk = await serviceWorkersTbl.count({where: {emailAddress: emailAddress}});
			if(chk==0){				 			
				const vCode = Math.floor(100000 + Math.random() * 900000);				
				/*sendMail({
					mTo: email,
					mSubject: `Verify your email address`,
					mMessage: `<h4>`+productName+` Account</h4>
					<p>For creating profile on `+productName+` account, we just need to make sure this email address is yours.</p>
					<p>Please use the following verification code for the `+productName+` account.</p>
					<h3>Verification Code: `+vCode+`</h3>
					<p>This code is valid only within ten minutes.</p>
					<p>Thanks,<br />The `+productName+` Team</p>`,
					mMsgBodyFormat: 'html'
				});*/
				res.status(200).send({status:"success", message:resMsg.success.sMsg1, sentOtp:vCode});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg2});
			}
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	},
	async webSignup (req, res){
		try {
 			const sentOtpNo = req.body.sentOtpNo;
			const enteredOtp = req.body.enteredOtp;
			
			if(sentOtpNo==enteredOtp){
				const emailAddress = req.body.email;
				const chk = await serviceWorkersTbl.count({where: {emailAddress: emailAddress}});
				if(chk==0){				
					const workerType = req.body.areYou;
					const firstName = req.body.firstName;
					const lastName = req.body.lastName;
					const contactNo = req.body.contactNo;
					const address = req.body.address;
					const curDate = new Date();
					const createDate = Date.parse(curDate);
					const createMonth = curDate.getMonth()+1;
					const createYear = curDate.getFullYear();
					const EncryptId = uuidv4()+createDate;
					await serviceWorkersTbl.create({ workerEncryptId: EncryptId, workerType: workerType, firstName: firstName, lastName: lastName, emailAddress: emailAddress, contactNo: contactNo, createDate: createDate, createMonth: createMonth, createYear: createYear })
					.then( resData => {
						res.status(200).send({status:"success",message:resMsg.success.sMsg12});
					});
				}else{
					res.status(200).send({status:"error",message:resMsg.error.eMsg10});
				}
			}else{
				res.status(200).send({status:"error", message:resMsg.error.eMsg1});
			}
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async list (req, res) {
		try {			
			const resData = await serviceWorkersTbl.findAll({where: {deletedSts: 0}, attributes: ['workerId', 'workerEncryptId', 'workerType', 'firstName', 'lastName', 'emailAddress', 'contactNo', 'status'] });			
			res.send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async workerTypeList (req, res) {
		try {			
			const workerType = req.params.id;
			const resData = await serviceWorkersTbl.findAll({where: {workerType: workerType, status: 0, deletedSts: 0}, attributes: ['workerId', 'workerEncryptId', 'workerType', 'firstName', 'lastName', 'emailAddress', 'contactNo', 'status'] });			
			res.send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async create (req, res){
		try {
 			const emailAddress = req.body.emailAddress;
			const chkUser = await serviceWorkersTbl.count({where: {emailAddress: emailAddress, deletedSts: 0}});
			if(chkUser==0){				
				const workerType = req.body.workerType;
				const firstName = req.body.firstName;
				const lastName = req.body.lastName;
				const contactNo = req.body.contactNo;
				const curDate = new Date();
				const createDate = Date.parse(curDate);
				const createMonth = curDate.getMonth()+1;
				const createYear = curDate.getFullYear();
				const EncryptId = uuidv4()+createDate;
 				await serviceWorkersTbl.create({ workerEncryptId: EncryptId, workerType: workerType, firstName: firstName, lastName: lastName, emailAddress: emailAddress, contactNo: contactNo, createDate: createDate, createMonth: createMonth, createYear: createYear })
				.then( resData => {
					res.status(200).send({status:"success",message:resMsg.success.sMsg12, resData: resData});
				});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg10});
			}		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async update (req, res){
		try {
 			const workerId = req.body.workerId;
			const emailAddress = req.body.emailAddress;
			const chkRow = await serviceWorkersTbl.count({where: {emailAddress: emailAddress, deletedSts: 0, workerId: {[Op.ne]: workerId} }});
			if(chkRow==0){
				const workerType = req.body.workerType;
				const firstName = req.body.firstName;
				const lastName = req.body.lastName;
				const contactNo = req.body.contactNo;
				const status = req.body.status;
				if(status=='Active'){
					var sts = 0;
				}else{
				 	var sts = 1;	
				}
 				await serviceWorkersTbl.update({ workerType: workerType, firstName: firstName, lastName: lastName, emailAddress: emailAddress, contactNo: contactNo, status: sts }, {where: {workerId: workerId}});
				res.status(200).send({status:"success",message:resMsg.success.sMsg13});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg10});
			}
		}catch(error) {
			res.status(400).send({status:"error test",message:error.message});
		}		
	},
	async remove (req, res){
		try {
 			const workerId = req.body.workerId;
			await serviceWorkersTbl.update({ deletedSts: 1 }, {where: {workerId: workerId}})
			res.status(200).send({status:"success",message:resMsg.success.sMsg14});	
		}catch(error) {
			res.status(400).send({status:"error test",message:error.message});
		}		
	}
};

module.exports = serviceWorkersController;