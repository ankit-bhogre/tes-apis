const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Admin = sequelize.define('tes_admins', {
	adminId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	adminType: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	emailAddress: {
		type: DataTypes.STRING,
		validate: {
			isEmail: true,
		},
    	allowNull: false
	},
	userName: {
		type: DataTypes.STRING,
    	allowNull: false
	},
	password: {
		type: DataTypes.STRING,
    	allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	status: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	createdBy: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	currentLogin: {
		type: DataTypes.INTEGER,
    	allowNull: true
	},
	lastLogin: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	isDeleted: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	tempForget: {
		type: DataTypes.STRING,
		allowNull: true
	},
	expLinkTime: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	freezeTableName: true,
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = Admin