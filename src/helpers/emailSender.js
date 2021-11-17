var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var userEmail = 'tns.ankit@gmail.com';
var userPassword = 'Google@Yahoo!';

/*let transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {        
		user: userEmail,
		pass: userPassword
	}
});*/

let transporter = nodemailer.createTransport(smtpTransport({    
	service: 'gmail',
	port: 587,
	host: 'smtp.gmail.com',
	secure: true,
	auth: {        
		user: 'tns.ankit@gmail.com',
		pass: 'Google@Yahoo!'
	}
}));

/*
var userEmail = 'info@indoreglasshouse.com';
var userPassword = 'Info@123';
let transporter = nodemailer.createTransport({
	host: "smtp.hostinger.com",
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: userEmail,
		pass: userPassword
	},
});*/

async function sendMail({ mTo, mSubject, mMessage, mMsgBodyFormat }) {
	
	/*let testAccount = await nodemailer.createTestAccount();
	
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});*/
	
	/*var userEmail = 'info@indoreglasshouse.com';
	var userPassword = 'Info@123';
	let transporter = nodemailer.createTransport({
		host: "smtp.hostinger.com",
		port: 465,
		secure: true, // true for 465, false for other ports
		auth: {
			user: userEmail,
			pass: userPassword
		},
	});*/
	
	if(mMsgBodyFormat === 'text'){
		var mailOptions = {from: userEmail, to: mTo, subject: mSubject, text: mMessage};
	}else{
		var mailOptions = {from: userEmail, to: mTo, subject: mSubject, html: mMessage};
	}
	
	await transporter.sendMail(mailOptions, (error, info) => {
		if(error){
			console.log(error);
		}else{
			//return true;
			console.log('Mail sent: %s', info.response);
		}
	});
}

module.exports = sendMail;