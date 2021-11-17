const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const {TABLES_PREFIX} = require('../../config');

const MasterWorkerTypesTbl = sequelize.define('SWTD', {
	workerType: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	typeName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	status: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
	}
}, {
	freezeTableName: false,
	tableName: TABLES_PREFIX+'master_service_worker_types',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

module.exports = MasterWorkerTypesTbl