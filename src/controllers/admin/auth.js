const Admin = require('../../models/admin/auth');
//var sendMail = require('../../helpers/emailSender');
const resMsg = require('../../helpers/resMsgAdmin');
const md5 = require('md5');
const { Op } = require("sequelize");
//const {v4 : uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const {FRONTEND_URL} = require('../../config');
const productName = process.env.PRODUCT_NAME;

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '4800s' });
}

const authController = {
	async checkLogin (req, res){
		try {
			const userName = req.body.userName;
			const password = md5(req.body.password);
			await Admin.findOne({ where: {userName: userName, password: password} }).then(adminRow => {				
				if(adminRow === null){
					res.status(200).send({status:"error",message:resMsg.error.eMsg1});
				}else{
					if(adminRow.isDeleted==0){
						if(adminRow.status==0){
							const curDate = new Date();
							const curTime = Date.parse(curDate); 
							Admin.update({ currentLogin: curTime, lastLogin: adminRow.currentLogin }, {where: {adminId: adminRow.adminId}});
							const token = generateAccessToken({ name: adminRow.firstName });
							res.status(200).send({status:"success",message:resMsg.success.sMsg1,accessToken: token, adminData: adminRow});
						}else{
							res.status(200).send({status:"error",message:resMsg.error.eMsg4});
						}						
					}else{
						res.status(200).send({status:"error",message:resMsg.error.eMsg2});
					}				
				}
			});
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	},	
	async passwordUpdate (req, res){
		try {
 			const adminId = req.body.adminId;
			const newPassword = req.body.newPassword;
			const confirmPassword = req.body.confirmPassword;
			if(newPassword===confirmPassword){
				await Admin.findOne({ where: {adminId: adminId} }).then(adminRow => {				
					if(adminRow === null){
						res.status(200).send({status:"error",message:resMsg.error.eMsg2});
					}else{
 						const oldPassword = md5(req.body.oldPassword);
 						if(adminRow.password===oldPassword){
							const pass = md5(confirmPassword);
							Admin.update({ password: pass }, {where: {adminId: adminRow.adminId}});
							res.status(200).send({status:"success",message:resMsg.success.sMsg1});					
						}else{
							res.status(200).send({status:"error",message:resMsg.error.eMsg10});
						}				
					}
				});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg9});
			}
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	},
	async subAdminDetails (req, res) {
		try {
			const adminId = req.params.id;
			const resData = await Admin.findByPk(adminId);
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},
	async subAdminList (req, res) {
		try {			
			const resData = await Admin.findAll({where: {isDeleted: 0} });			
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async subAdminCreate (req, res) {
		try { 			
			const userName = req.body.userName;
			const chkRow = await Admin.count({where: {userName: userName}});
			if(chkRow==0){				
				
				const adminType = req.body.adminType;
				const firstName = req.body.firstName;
				const lastName = req.body.lastName;
				const emailAddress = req.body.emailAddress;
				const password = md5(req.body.password);
				const createdBy = req.body.createdBy;
				
 				await Admin.create({ adminType: adminType, firstName: firstName, lastName: lastName, emailAddress: emailAddress, userName: userName, password: password, createdBy: createdBy })
				.then( resData => {
					res.status(200).send({status:"success",message:resMsg.success.sMsg3, resData: resData});
				});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg8});
			}		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async subAdminUpdate (req, res) {
		try {
 			const adminId = req.body.adminId;
			const userName = req.body.userName;
			const chkRow = await Admin.count({where: {userName: userName, isDeleted: 0, adminId: {[Op.ne]: adminId} }});
			if(chkRow==0){				
				const adminType = req.body.adminType;
				const firstName = req.body.firstName;
				const lastName = req.body.lastName;
				const emailAddress = req.body.emailAddress;
				const status = req.body.status;
				await Admin.update({ adminType: adminType, firstName: firstName, lastName: lastName, emailAddress: emailAddress, userName: userName, status: status }, {where: {adminId: adminId}});
				res.status(200).send({status:"success",message:resMsg.success.sMsg4});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg8});
			}		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async subAdminRemove (req, res){
		try {
 			const adminId = req.body.adminId;
			await Admin.update({ isDeleted: 1 }, {where: {adminId: adminId}})
			res.status(200).send({status:"success",message:resMsg.success.sMsg5});	
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	}
};

module.exports = authController;