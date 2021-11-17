const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const invitesTbl = sequelize.define('Invite', {
	inviteId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userId: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	},
	friendsEmails: {
		type: DataTypes.STRING,
		allowNull: false
	}
}, {
	freezeTableName: false,
	tableName: TABLES_PREFIX+'users_invites_friends',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = invitesTbl