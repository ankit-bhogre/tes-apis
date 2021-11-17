const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const askedQuestion = sequelize.define('tes_asked_questions', {
	askedQuesId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	encryptAskedQuesId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	userId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	quesAskedFrom: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	eventId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	quesId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	otherQuesTitle: {
		type: DataTypes.STRING,
		allowNull: true
	},
	quesAmt: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	consultantSchedSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},	
	consultantSchedTime: {
		type: DataTypes.STRING,
		allowNull: true
	},
	ReqActionPerformSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	ReqPerfromedTime: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	askedDate: {
		type: DataTypes.STRING,
    	allowNull: false
	},
	assignServiceWorkerSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	workerId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	paymentSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	solvedSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	askedMonth: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	askedYear: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	deletedSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	}
}, {
	freezeTableName: true,
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = askedQuestion