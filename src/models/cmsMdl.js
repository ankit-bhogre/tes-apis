const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const CmsTbl = sequelize.define('ContentDetail', {
	cmsId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	pageName: {
		type: DataTypes.STRING,
    	allowNull: false
	},
	sectionType: {
		type: DataTypes.STRING,
    	allowNull: false
	},
	secTitle: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	secSubTitle: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	secShortDesc: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	titleOne: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	titleOneSlug: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	titleTwo: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	titleTwoSlug: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	subTitleOne: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	subTitleTwo: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	shortDescOne: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	shortDescTwo: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	contentDescOne: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	contentDescTwo: {
		type: DataTypes.STRING,
    	allowNull: true
	},
	homePageSection: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true
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
	tableName: TABLES_PREFIX+'cms',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = CmsTbl