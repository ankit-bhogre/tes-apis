const User = require('../models/user')
const userWalletLogs = require('../models/userWalletLogs')
const userEmails = require('../models/verifyEmail')
var sendMail = require('../helpers/emailSender');
const resMsg = require('../helpers/resMsg');
const md5 = require('md5');
const {v4 : uuidv4} = require('uuid');
const jwt = require('jsonwebtoken');
const {FRONTEND_URL} = require('../config');
const productName = process.env.PRODUCT_NAME;
const { Op } = require("sequelize");

function generateAccessToken(email) {
  return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '4800s' });
}

const usersController = {
	async list (req, res) {
		try {
			const users_data = await User.findAll({attributes: ['firstName', 'email']}); //{attributes: ['name', 'createdAt']}
			res.status(200).send(users_data);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async adminData (req, res) {
		try {
			const users_data = await User.findAll({attributes: ['userId', 'firstName', 'lastName', 'email', 'contactNo', 'isActive', 'createDate']});
			res.status(200).send(users_data);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async checkValidUserEncryptId (req, res) {
		try {
			const encryptId = req.params.encryptId;
			const userData = await User.findOne({ where: {userEncryptId: encryptId}, attributes: ['userId'] });
			if (userData === null) {
				res.status(200).send({status:"error",message:'Link has been expired!'});
			}else{
				res.status(200).send(userData);
			}			
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async profileUpdate (req, res) {
		try {
			const userId = req.body.userId;
			const email = req.body.email;
			const firstName = req.body.firstName;
			const lastName = req.body.lastName;
			const contactNo = req.body.contactNo;
			const chkUser = await User.count({where: {email: email, userId: {[Op.ne]: userId} }});
			if(chkUser==0){				
				await User.update({ firstName: firstName, lastName: lastName, email: email, contactNo: contactNo }, {where: {userId: userId}});				
				await User.findOne({ where: {userId: userId} }).then(userRow => {				
					if(userRow === null){
						res.status(200).send({status:"error",message:resMsg.error.eMsg7});
					}else{
						res.status(200).send({status:"success", message:resMsg.success.sMsg4, userData: userRow});
					}
				});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg2});
			}			
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async passwordUpdate (req, res) {
		try {
			const userId = req.body.userId;
			const oldPassword = md5(req.body.oldPassword);
			const newPassword = md5(req.body.newPassword);
			const confirmPassword = md5(req.body.confirmPassword);
 			const userData = await User.findOne({ where: {userId: userId}, attributes: ['userId', 'password'] });
			if(userData.password === oldPassword){
				if(newPassword === confirmPassword){
					await User.update({ password: confirmPassword }, {where: {userId: userId}});
					res.status(200).send({status:"success", message:'Your password has been changed!'});		
				}else{
					res.status(200).send({status:"error", message: 'Confirm Passwords does not match!'});
				}
			}else{
				res.status(200).send({status:"error", message: 'Please enter correct your old password!'});
			}		
		}catch(error) {
			res.status(400).send({status:"error", message:error.message});
		}
	},
	async emailCheck (req, res){
		try {
			const email = req.body.email;
			const referredBy = req.body.referredBy;
			const chkRealUser = await User.count({where: {email: email}});
			if(chkRealUser==0){
				const curDate = new Date();
				const fDate = new Date(curDate.getTime() + 10*60000);
				const expTime = Date.parse(fDate);  			
				const vCode = Math.floor(100000 + Math.random() * 900000);
				const chkUser = await userEmails.count({where: {vEmail: email}});
				if(chkUser==0){
					await userEmails.create({ vEmail: email, vCode: vCode, expireTime: expTime, referredBy: referredBy })
				}else{
					await userEmails.update({ vCode: vCode, expireTime: expTime, referredBy: referredBy }, {where: {vEmail: email}})
				}
				sendMail({
					mTo: email,
					mSubject: `Verify your email address`,
					mMessage: `<h4>`+productName+` Account</h4>
					<p>For creating profile on `+productName+` account, we just need to make sure this email address is yours.</p>
					<p>Please use the following verification code for the `+productName+` account.</p>
					<h3>Verification Code: `+vCode+`</h3>
					<p>This code is valid only within ten minutes.</p>
					<p>Thanks,<br />The `+productName+` Team</p>`,
					mMsgBodyFormat: 'html'
				});
				res.status(200).send({status:"success",message:resMsg.success.sMsg1});
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg2});
			}
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	},
	async emailVerify (req, res){
		try {
 			const email = req.body.email;
			const vcode = req.body.vcode;
			const resData = await userEmails.findAll({where: {vEmail: email, vCode: vcode}, attributes: ['expireTime'] });
			if(resData!=''){
				const expTime = resData[0].expireTime;
 				var date = new Date();
				const curTime = Date.parse(date);
				if(expTime>=curTime){
					res.status(200).send({status:"success",message:resMsg.success.sMsg2});
				}else{
					res.status(200).send({status:"error",message:resMsg.error.eMsg1});
				}				
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg1});
			}			
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async create (req, res){
		try {
 			const email = req.body.email;
			const chkUser = await User.count({where: {email: email}});
			if(chkUser==0){				
				const firstName = req.body.firstName;
				const lastName = req.body.lastName;
				const contactNo = req.body.contactNo;
				const password = md5(req.body.password);
				const ipAddress = req.body.ipAddress;
				const curDate = new Date();
				const createDate = Date.parse(curDate);
				const createMonth = curDate.getMonth()+1;
				const createYear = curDate.getFullYear();
				const EncryptId = uuidv4()+createDate;				
 				const referredBy = parseInt(req.body.referredBy);				
				if(referredBy>0){
					var creditAmt = 10;
				}else{
					var creditAmt = 0;	
				}
 				const userResponse = await User.create({ userEncryptId: EncryptId, referredBy: referredBy, walletBal: creditAmt, firstName: firstName, lastName: lastName, email: email, contactNo: contactNo, password: password, createDate: createDate, createMonth: createMonth, createYear: createYear, ipAddress: ipAddress }); 				
				const insertedUserId = userResponse.userId;
				if(referredBy>0){					
 					const referredByUserDetails = await User.findOne({ where: {userId: referredBy}, attributes: ['walletBal'] });
					const oldWalletBal = referredByUserDetails.walletBal;
					const newWalletBal = parseInt(oldWalletBal)+parseInt(creditAmt);
					await User.update({ walletBal: newWalletBal }, { where: { userId: referredBy } });
					await userWalletLogs.create({ userId: referredBy, amt: creditAmt, referralTo: insertedUserId, insertedDate: createDate, statusFor: 1 });
					await userWalletLogs.create({ userId: insertedUserId, amt: creditAmt, referralFrom: referredBy, insertedDate: createDate, statusFor: 1 });
				}	
				res.status(200).send({status:"success",message:resMsg.success.sMsg3});					
			}else{
				res.status(200).send({status:"error",message:resMsg.error.eMsg2});
			}
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	},
	async byId (req, res) {
		try {
			const id = req.params.id;
			const user_details = await User.findByPk(id);
			res.send(user_details);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		} 
	},	
	async forgotPassword (req, res){
		try {
			const email = req.body.email;
			await User.findOne({ where: {email: email}, attributes: ['userId', 'firstName', 'userEncryptId', 'isDeleted'] }).then(userData => {
				if(userData === null){
					res.status(200).send({status:"error",message:resMsg.error.eMsg3});
				}else{
					if(userData.isDeleted==0){
						const curDate = new Date();
						const fDate = new Date(curDate.getTime() + 10*60000); // 10 min valid link
						const expLinkTime = Date.parse(fDate); 
						const tempForget = Math.floor(100000 + Math.random() * 900000);
						
						User.update({ tempForget: tempForget, expLinkTime: expLinkTime }, {where: {userId: userData.userId}});
						const recoverLink = FRONTEND_URL+'recover/password/'+userData.userEncryptId+'/'+tempForget;
						
						sendMail({
							mTo: email,
							mSubject: 'Forgot Password',
							mMessage: `<p>Hi `+userData.firstName+`</p>
							<p>You recently requested to reset your password for your `+productName+` account. Use the button below to reset it. This password reset is only valid for the next 10 Mins.</p>
							<p><a href=`+recoverLink+`>Click here to reset your password</a></p>
							<p>If you did not request a password reset, please ignore this email.</p>
							<p>Thanks,<br />The `+productName+` Team</p>`,
							mMsgBodyFormat: 'html'
						});
 						
						res.status(200).send({status:"success",message:resMsg.success.sMsg9}); 
					}else{
						res.status(200).send({status:"error",message:resMsg.error.eMsg4});
					}
				}
			});
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	},	
	async setPasswordValidLink (req, res){
		try {
			const encryptId = req.body.encryptId;
			const rCode = req.body.randomCode;			
			await User.findOne({ where: {userEncryptId: encryptId, tempForget: rCode}, attributes: ['userId', 'userEncryptId', 'expLinkTime'] }).then(userRow => {				
				if(userRow === null){
					res.status(200).send({status:"error",message:resMsg.error.eMsg5});
				}else{
					var expLinkTime = userRow.expLinkTime;
					const curDate = new Date();
					const curTime = Date.parse(curDate);
					if(curTime>expLinkTime){
						res.status(200).send({status:"error",message:resMsg.error.eMsg6});	
					}else{
						res.status(200).send({status:"success",message:"ok"});
					}					
				}
			});
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	},	
	async recoverPassword (req, res){
		try {
			const encryptId = req.body.encryptId;
			const password = md5(req.body.password);
			await User.update({ password: password, tempForget: "", expLinkTime: "" }, {where: {userEncryptId: encryptId}});
			res.status(200).send({status:"success",message:"ok"}); 
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	},	
	async checkLogin (req, res){
		try {
			const email = req.body.email;
			const password = md5(req.body.password);
			await User.findOne({ where: {email: email, password: password} }).then(userRow => {				
				if(userRow === null){
					res.status(200).send({status:"error",message:resMsg.error.eMsg7});
				}else{
					if(userRow.isDeleted==0){
						if(userRow.isActive==0){
							const curDate = new Date();
							const curTime = Date.parse(curDate); 
							const token = generateAccessToken({ email: email });
							User.update({ accessToken: token, currentLogin: curTime }, {where: {userId: userRow.userId}});							
							res.status(200).send({status:"success",message:resMsg.success.sMsg4,accessToken: token, userData: userRow});
						}else{
							res.status(200).send({status:"error",message:resMsg.error.eMsg8});
						}						
					}else{
						res.status(200).send({status:"error",message:resMsg.error.eMsg4});
					}				
				}
			});
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	}
};

module.exports = usersController;