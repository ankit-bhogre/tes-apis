const CmsTbl = require('../models/cmsMdl');
const CmsMetaTbl = require('../models/cmsMetaMdl');
const resMsg = require('../helpers/resMsg');
const slugify = require('slugify');
const { Op } = require("sequelize");

const cmsController = {
	async pageHomeAllSectionsData (req, res) {
		try {			
			CmsTbl.hasMany(CmsMetaTbl, {foreignKey: 'cmsId'});
			const resData = await CmsTbl.findAll({ 
				//where: {cmsId: 9},
				attributes: ['cmsId', 'pageName', 'sectionType', 'secTitle', 'secSubTitle', 'secShortDesc', 'titleOne', 'titleOneSlug', 'titleTwo', 'titleTwoSlug', 'subTitleOne', 'subTitleTwo', 'shortDescOne', 'shortDescTwo', 'contentDescOne', 'contentDescTwo'],
				order: [
					['cmsId', 'desc'],
				],
 				include: { 
					model: CmsMetaTbl,
					order: [
						['priority', 'asc'],
					],
					attributes: ['cmsMetaId', 'mTitle', 'mShortDesc', 'mDesc'],					
					required: false
				} 
			});				
			/*const resData = await CmsTbl.findAll({
				attributes: ['cmsId', 'pageName', 'sectionType', 'secTitle', 'secSubTitle', 'secShortDesc', 'titleOne', 'titleOneSlug', 'titleTwo', 'titleTwoSlug', 'subTitleOne', 'subTitleTwo', 'shortDescOne', 'shortDescTwo', 'contentDescOne', 'contentDescTwo'] 
			});*/
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async sectionWiseData (req, res) {
		try {			
			const pageName = req.params.page;
			const sectionType = req.params.section;
			
			CmsTbl.hasMany(CmsMetaTbl, {foreignKey: 'cmsId'});
			const resData = await CmsTbl.findAll({ 
				where: {pageName: pageName, sectionType: sectionType, deletedSts: 0}, 
				attributes: ['cmsId', 'pageName', 'sectionType', 'secTitle', 'secSubTitle', 'secShortDesc', 'titleOne', 'titleOneSlug', 'titleTwo', 'titleTwoSlug', 'subTitleOne', 'subTitleTwo', 'shortDescOne', 'shortDescTwo', 'contentDescOne', 'contentDescTwo'],
				order: [
					['cmsId', 'desc'],
				],
 				include: { 
					model: CmsMetaTbl,
					order: [
						['priority', 'asc'],
					],
					attributes: ['cmsMetaId', 'mTitle', 'mShortDesc', 'mDesc'],					
					required: false
				} 
			});
			
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async byId (req, res) {
		try {
			const cmsId = req.params.id;
			const resData = await CmsTbl.findByPk(cmsId);
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},
	async byPageName (req, res) {
		try {
			const pageName = req.params.pageName;
			const resData = await CmsTbl.findAll({
				where: {pageName: pageName},
				order: [
					['priority', 'asc'],
				],
				attributes: ['cmsId', 'pageName', 'sectionType', 'secTitle', 'secSubTitle', 'secShortDesc', 'titleOne', 'titleOneSlug', 'titleTwo', 'titleTwoSlug', 'subTitleOne', 'subTitleTwo', 'shortDescOne', 'shortDescTwo', 'contentDescOne', 'contentDescTwo'] 
			});
			res.status(200).send(resData);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	},	
	async createCms (req, res) {
		try {
 			const pageName = req.body.pageName;
			const sectionType = req.body.sectionType;
			const titleOne = req.body.titleOne;
			const titleOneSlug = slugify(titleOne,{replacement: '-', remove: undefined, lower: true, strict: true});
			const titleTwo = req.body.titleTwo;
			const titleTwoSlug = slugify(titleTwo,{replacement: '-', remove: undefined, lower: true, strict: true});
			const subTitleOne = req.body.subTitleOne;
			const subTitleTwo = req.body.subTitleTwo;
			const shortDescOne = req.body.shortDescOne;
			const shortDescTwo = req.body.shortDescTwo;
			const contentDescOne = req.body.contentDescOne;
			const contentDescTwo = req.body.contentDescTwo;
			
			const resData = await CmsTbl.create({ pageName: pageName, sectionType: sectionType, titleOne: titleOne, titleOneSlug: titleOneSlug, titleTwo: titleTwo, titleTwoSlug: titleTwoSlug, subTitleOne: subTitleOne, subTitleTwo: subTitleTwo, shortDescOne: shortDescOne, shortDescTwo: shortDescTwo, contentDescOne: contentDescOne, contentDescTwo: contentDescTwo });
			res.status(200).send({status:"success",message:resMsg.success.sMsg12, resData: resData});
					
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async updateCms (req, res) {
		try {
 			const cmsId = req.body.cmsId;
			const titleOne = req.body.titleOne;
			const titleOneSlug = slugify(titleOne,{replacement: '-', remove: undefined, lower: true, strict: true});
			const titleTwo = req.body.titleTwo;
			const titleTwoSlug = slugify(titleTwo,{replacement: '-', remove: undefined, lower: true, strict: true});
			const subTitleOne = req.body.subTitleOne;
			const subTitleTwo = req.body.subTitleTwo;
			const shortDescOne = req.body.shortDescOne;
			const shortDescTwo = req.body.shortDescTwo;
			const contentDescOne = req.body.contentDescOne;
			const contentDescTwo = req.body.contentDescTwo;
			
			await CmsTbl.update({ titleOne: titleOne, titleOneSlug: titleOneSlug, titleTwo: titleTwo, titleTwoSlug: titleTwoSlug, subTitleOne: subTitleOne, subTitleTwo: subTitleTwo, shortDescOne: shortDescOne, shortDescTwo: shortDescTwo, contentDescOne: contentDescOne, contentDescTwo: contentDescTwo }, {where: {cmsId: cmsId}});
			res.status(200).send({status:"success",message:resMsg.success.sMsg12});
					
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async updateService (req, res) {
		try {
 			const eId = req.body.eId;
			const titleOne = req.body.eTitle;
			const titleOneSlug = slugify(titleOne,{replacement: '-', remove: undefined, lower: true, strict: true});
			const contentDescOne = req.body.eShortDesc;			
			const eFor = req.body.eFor;
			if(eFor=='cms'){
				await CmsTbl.update({ titleOne: titleOne, titleOneSlug: titleOneSlug, contentDescOne: contentDescOne }, {where: {cmsId: eId}});
			}else{
				await CmsMetaTbl.update({ mTitle: titleOne, mDesc: contentDescOne }, {where: {cmsMetaId: eId}});
			}
			res.status(200).send({status:"success",message:resMsg.success.sMsg12});					
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async updateSectionHeading (req, res) {
		try {
 			const cmsId = req.body.cmsId;
			const secTitle = req.body.secTitle;
			const secSubTitle = req.body.secSubTitle;
			const secShortDesc = req.body.secShortDesc;
			await CmsTbl.update({ secTitle: secTitle, secSubTitle: secSubTitle, secShortDesc: secShortDesc }, {where: {cmsId: cmsId}});
			res.status(200).send({status:"success",message:resMsg.success.sMsg12});					
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async updateMultiService (req, res) {
		try {
 			const cmsId = req.body.cmsId;
			const secTitle = req.body.secTitle;
			const secShortDesc = req.body.secShortDesc;
			const titleTwo = req.body.titleTwo;
			const titleTwoSlug = req.body.titleTwoSlug;
			const subTitleOne = req.body.subTitleOne;
			const subTitleTwo = req.body.subTitleTwo;
			const shortDescOne = req.body.shortDescOne;
			const shortDescTwo = req.body.shortDescTwo;			
			await CmsTbl.update({ secTitle: secTitle, secShortDesc: secShortDesc, titleTwo: titleTwo, titleTwoSlug: titleTwoSlug, subTitleOne: subTitleOne, subTitleTwo: subTitleTwo, shortDescOne: shortDescOne, shortDescTwo: shortDescTwo }, {where: {cmsId: cmsId}});
			res.status(200).send({status:"success",message:resMsg.success.sMsg12});					
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async updateAboutUs (req, res) {
		try {
 			const cmsId = req.body.cmsId;
			const secTitle = req.body.secTitle;
			const secSubTitle = req.body.secSubTitle;
			const contentDescOne = req.body.contentDescOne;
			const titleOne = req.body.titleOne;
 			await CmsTbl.update({ secTitle: secTitle, secSubTitle: secSubTitle, titleOne: titleOne, contentDescOne: contentDescOne }, {where: {cmsId: cmsId}});
			res.status(200).send({status:"success",message:resMsg.success.sMsg12});					
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},	
	async updateHowItWorks (req, res) {
		try {
 			const cmsId = req.body.cmsId;
			const step = req.body.step;
			const secTitle = req.body.secTitle;
			const secShortDesc = req.body.secShortDesc;
			if(step==1){
				await CmsTbl.update({ titleOne: secTitle, titleOneSlug: secShortDesc }, {where: {cmsId: cmsId}});
			}else if(step==2){
				await CmsTbl.update({ titleTwo: secTitle, titleTwoSlug: secShortDesc }, {where: {cmsId: cmsId}});
			}else if(step==3){
				await CmsTbl.update({ subTitleOne: secTitle, subTitleTwo: secShortDesc }, {where: {cmsId: cmsId}});
			}else if(step==4){
				await CmsTbl.update({ shortDescOne: secTitle, shortDescTwo: secShortDesc }, {where: {cmsId: cmsId}});
			}else if(step==5){
				await CmsTbl.update({ contentDescOne: secTitle, contentDescTwo: secShortDesc }, {where: {cmsId: cmsId}});
			}
 			
			res.status(200).send({status:"success",message:resMsg.success.sMsg12});					
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	},
	async removeCms (req, res){
		try {
 			const cmsId = req.body.cmsId;
			await CmsTbl.update({ deletedSts: 1 }, {where: {cmsId: cmsId}})
			res.status(200).send({status:"success",message:resMsg.success.sMsg14});	
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}		
	}
};

module.exports = cmsController;