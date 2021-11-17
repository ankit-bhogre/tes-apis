const MasterWorkerTypesTbl = require('../models/masters/workerTypes');

const mastersController = {
	async workerTypesList (req, res) {
		try {			
			const resData = await MasterWorkerTypesTbl.findAll();			
			res.status(200).send(resData);
		}catch(error) {
			res.status(400).send({status:"error",message:error.message});
		}
	}
};

module.exports = mastersController;