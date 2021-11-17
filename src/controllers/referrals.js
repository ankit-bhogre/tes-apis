const invitesTbl = require('../models/referrals');
const User = require('../models/user')
const resMsg = require('../helpers/resMsg');
var sendMail = require('../helpers/emailSender');
const {FRONTEND_URL} = require('../config');
const productName = process.env.PRODUCT_NAME;

const referralController = {
	async invitesFriends (req, res) {
		try {
 			const friendsEmails = req.body.emailAddresses;
			const userId = req.body.userId;
			const userData = await User.findOne({ where: {userId: userId}, attributes: ['userEncryptId'] });
		 	const userReferralLink = FRONTEND_URL+'via-referral/signup/'+userData.userEncryptId;
			
			/*sendMail({
				mTo: friendsEmails,
				mSubject: `Verify your email address`,
				mMessage: `<h4>`+productName+` Account</h4>`,
				mMsgBodyFormat: 'html'
			});*/
			await invitesTbl.create({ friendsEmails: friendsEmails, userId: userId });
			res.status(200).send({status:"success",message:'Invitation has been sent!'});		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	}
};

module.exports = referralController;