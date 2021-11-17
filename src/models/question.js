const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const questions = sequelize.define('Question' , {
	quesId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	catId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false,
	},
	quesTitle: {
		type: DataTypes.STRING,
		allowNull: false
	},
	quesCost: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false,
	},
	quesStatus: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	},
	quesDeletedSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	}
}, {
	freezeTableName: false,
	tableName: TABLES_PREFIX+'questions',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = questions