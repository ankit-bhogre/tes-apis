const braintree = require("braintree");
const askedQuestion = require('../../models/askedQuestions');
const askedQuesPayment = require('../../models/askedQuestionPayments');
const resMsg = require('../../helpers/resMsg');

var gateway = new braintree.BraintreeGateway({
	environment:  braintree.Environment.Sandbox,
    merchantId:   'zfgjm8838q3px5x2',
    publicKey:    '568v2hpmgqwqhxgx',
    privateKey:   '4cef18b5c7a6a9b847d761b563cfcef3'
});

/*var gateway = braintree.connect({
    environment:  braintree.Environment.Sandbox,
    merchantId:   'zfgjm8838q3px5x2',
    publicKey:    '568v2hpmgqwqhxgx',
    privateKey:   '4cef18b5c7a6a9b847d761b563cfcef3'
});*/

const BraintreeController = {
	async getClientToken (req, res){
		try {
			gateway.clientToken.generate({}, function (err, response) {
				res.status(200).send({status:"success",clientToken:response.clientToken});
			}); 
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}	
	},
	async receivedPayment (req, res){
		const payAmt = req.body.payAmt;
		const nonceFromTheClient = req.body.payment_method_nonce;
		gateway.transaction.sale({
			amount: payAmt,
			paymentMethodNonce: nonceFromTheClient,
			//deviceData: deviceDataFromTheClient,
			options: {
				submitForSettlement: true
			}
		},(err, result) => {
			res.status(200).send(result);
		});
	},
	async successTransEntry (req, res){
		
		/*createdAt: res.data.transaction.createdAt,
		updatedAt: res.data.transaction.updatedAt,*/
		try {
			const askedQuesId = req.body.askedQuesId;
			const resData = await askedQuesPayment.create({ 
				askedQuesId: askedQuesId,
				userId: req.body.userId,
				paymentBy: req.body.paymentBy,
				merchantAccountId: req.body.merchantAccountId,
				status: req.body.status,
				type: req.body.type,
				settlementBatchId: req.body.settlementBatchId,
				txnId: req.body.txnId,
				txnAmount: req.body.txnAmount,
				currencyIsoCode: req.body.currencyIsoCode,
				globalId: req.body.globalId,
				cardLast4: req.body.cardLast4,
				cardType: req.body.cardType,
				paypalPayerId: req.body.paypalPayerId,
				paypalPayerStatus: req.body.paypalPayerStatus,
				paypalPaymentId: req.body.paypalPaymentId,
				paypalTransFeeAmount: req.body.paypalTransFeeAmount,
				merchantIdentificationNo: req.body.merchantIdentificationNo,
				merchantName: req.body.merchantName,
				pinVerified: req.body.pinVerified,
				processingMode: req.body.processingMode,
				processorAuthCode: req.body.processorAuthCode,
				processorResCode: req.body.processorResCode,
				processorResText: req.body.processorResText,
				terminalIdentificationNo: req.body.terminalIdentificationNo
			});
			await askedQuestion.update({ paymentSts: 1 }, {where: {askedQuesId: askedQuesId}});
			res.status(200).send({status:"success",message:resMsg.success.sMsg8});		
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	}
};

module.exports = BraintreeController;