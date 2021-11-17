const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const CustFeedbackTbl = sequelize.define('Feedback', {
	feedbackId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	customerMsg: {
		type: DataTypes.STRING,
		allowNull: false
	},
	givenDate: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
		allowNull: false
	},
	status: {
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
	freezeTableName: false,
	tableName: TABLES_PREFIX+'customers_feedback',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = CustFeedbackTbl