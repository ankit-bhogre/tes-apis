const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const questionCategory = sequelize.define('tes_questions_categories', {
	catId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	catName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	catSlug: {
		type: DataTypes.STRING,
		allowNull: false
	},
	catStatus: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	},
	catDeletedSts: {
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

module.exports = questionCategory