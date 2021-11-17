const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const CmsMetaTbl = sequelize.define('ContentMetaDetail', {
	cmsMetaId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	cmsId: {
		type: DataTypes.INTEGER,
    	allowNull: false
	},
	mTitle: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	mShortDesc: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	mDesc: {
		type: DataTypes.STRING,
    	allowNull: true
	}
}, {
	freezeTableName: false,
	tableName: TABLES_PREFIX+'cms_meta',
	timestamps: false,
	createdAt: false,
	updatedAt: false
});

module.exports = CmsMetaTbl