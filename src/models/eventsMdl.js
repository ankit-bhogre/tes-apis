const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const eventsTbl = sequelize.define('Event' , {
	eventId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	eventTitle: {
		type: DataTypes.STRING,
		allowNull: false
	},
	eventSlug: {
		type: DataTypes.STRING,
		allowNull: false
	},
	topicId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false,
	},
	joinSts: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	joinFee: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: false
	},
	hostBy: {
		type: DataTypes.STRING,
		allowNull: true
	},
	eventDate: {
		type: DataTypes.STRING,
		allowNull: true
	},
	eventURL: {
		type: DataTypes.STRING,
		allowNull: true
	},
	eventDuration: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	enablexRoomId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	enablexServiceId: {
		type: DataTypes.STRING,
		allowNull: true
	},
	enablexRoomCreated: {
		type: DataTypes.STRING,
		allowNull: true
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
	tableName: TABLES_PREFIX+'events',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = eventsTbl