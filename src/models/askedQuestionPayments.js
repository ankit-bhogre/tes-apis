const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const askedQuesPayment = sequelize.define('PaymentInfo', {
	paymentId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	askedQuesId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	userId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	paymentBy: {
		type: DataTypes.STRING,
		allowNull: true
	},
	merchantAccountId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	status: {
		type: DataTypes.STRING,
		allowNull: true
	},
	type: {
		type: DataTypes.STRING,
		allowNull: true
	},
	settlementBatchId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	txnId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	txnAmount: {
		type: DataTypes.STRING,
		allowNull: true
	},
	currencyIsoCode: {
		type: DataTypes.STRING,
		allowNull: true
	},
	globalId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	cardLast4: {
		type: DataTypes.STRING,
		allowNull: true
	},
	cardType: {
		type: DataTypes.STRING,
		allowNull: true
	},
	paypalPayerId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	paypalPayerStatus: {
		type: DataTypes.STRING,
		allowNull: true
	},
	paypalPaymentId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	paypalTransFeeAmount: {
		type: DataTypes.STRING,
		allowNull: true
	},
	merchantIdentificationNo: {
		type: DataTypes.STRING,
		allowNull: true
	},
	merchantName: {
		type: DataTypes.STRING,
		allowNull: true
	},
	pinVerified: {
		type: DataTypes.STRING,
		allowNull: true
	},
	processingMode: {
		type: DataTypes.STRING,
		allowNull: true
	},
	processorAuthCode: {
		type: DataTypes.STRING,
		allowNull: true
	},
	processorResCode: {
		type: DataTypes.STRING,
		allowNull: true
	},
	processorResText: {
		type: DataTypes.STRING,
		allowNull: true
	},
	terminalIdentificationNo: {
		type: DataTypes.STRING,
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
	tableName: 'tes_asked_question_payments',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = askedQuesPayment