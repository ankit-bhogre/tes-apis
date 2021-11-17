const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const serviceWorkersTbl = sequelize.define('ServiceWorkerDetail', {
	workerId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	workerEncryptId: {
		type: DataTypes.STRING,
		allowNull: false
	},
	workerType: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false,
	},
	firstName: {
		type: DataTypes.STRING,
    	allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
    	allowNull: false
	},
	emailAddress: {
		type: DataTypes.STRING,
		validate: {
			isEmail: true,
		},
		allowNull: false
	},
	contactNo: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false,
	},
	createDate: {
		type: DataTypes.STRING,
    	allowNull: false,
	},
	createMonth: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	},
	createYear: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
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
	tableName: TABLES_PREFIX+'service_workers',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = serviceWorkersTbl