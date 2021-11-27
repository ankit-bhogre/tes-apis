const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const eventTopicTbl = sequelize.define('eventTopic' , {
	topicId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	topicName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	topicSlug: {
		type: DataTypes.STRING,
		allowNull: false
	},
	status: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	},
	deletedSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	}
}, {
	freezeTableName: false,
	tableName: TABLES_PREFIX+'event_topics',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = eventTopicTbl