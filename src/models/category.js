const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Category = sequelize.define('shibi_categories', {
	// Model attributes are defined here
	category_id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	}
}, {
	freezeTableName: true,
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

module.exports = Category