const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const userEmails = sequelize.define('tes_user_emails', {
	vId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	vEmail: {
		type: DataTypes.STRING,
		validate: {
			isEmail: true,
		}
	},
	vCode: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	},
	expireTime: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	},
	referredBy: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	}
}, {
	freezeTableName: true,
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = userEmails