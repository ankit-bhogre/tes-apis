const CouponTbl = require('../models/coupon');
const resMsg = require('../helpers/resMsg');
const slugify = require('slugify');
const { Op } = require("sequelize");

const couponsController = {
	async list (req, res) {
		try {			
			const resData = await CouponTbl.findAll({where: {deletedSts: 0}, attributes: ['couponId', 'couponCode', 'discountPer', 'expireDate', 'status'] });			
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async byId (req, res) {
		try {
			const couponId = req.params.id;
			const resData = await CouponTbl.findByPk(couponId);
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},	
	async create (req, res) {
		try {
 			const couponCode = req.body.couponCode;
			const couponCodeSlug = slugify(couponCode,{replacement: '-', remove: undefined, lower: true, strict: true});
			const chkRow = await CouponTbl.count({where: {couponCodeSlug: couponCodeSlug, deletedSts: 0}});
			if(chkRow==0){				
				const discountPer = req.body.discountPer;
				const expireDate = req.body.expireDate;
				const curDate = new Date();
				const createDate = Date.parse(curDate);
 				await CouponTbl.create({ couponCode: couponCode, couponCodeSlug: couponCodeSlug, discountPer: discountPer, expireDate: expireDate, createDate: createDate })
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
	async update (req, res) {
		try {
 			const couponId = req.body.couponId;
			const couponCode = req.body.couponCode;
			const couponCodeSlug = slugify(couponCode,{replacement: '-', remove: undefined, lower: true, strict: true});
			const chkRow = await CouponTbl.count({where: {couponCodeSlug: couponCodeSlug, deletedSts: 0, couponId: {[Op.ne]: couponId} }});
			if(chkRow==0){				
				const discountPer = req.body.discountPer;
				const expireDate = req.body.expireDate;
				const status = req.body.status;
				await CouponTbl.update({ couponCode: couponCode, couponCodeSlug: couponCodeSlug, discountPer: discountPer, expireDate: expireDate, status: status }, {where: {couponId: couponId}});
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
 			const couponId = req.body.couponId;
			await CouponTbl.update({ deletedSts: 1 }, {where: {couponId: couponId}})
			res.status(200).send({status:"success",message:resMsg.success.sMsg14});	
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	}
};

module.exports = couponsController;