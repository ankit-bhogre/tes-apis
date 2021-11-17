const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CouponTbl = sequelize.define('tes_coupons', {
	couponId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	couponCode: {
		type: DataTypes.STRING,
		allowNull: false
	},
	couponCodeSlug: {
		type: DataTypes.STRING,
		allowNull: false
	},
	discountPer: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
		allowNull: false
	},
	expireDate: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
		allowNull: false
	},
	createDate: {
		type: DataTypes.INTEGER,
    	allowNull: false
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
	freezeTableName: true,
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

module.exports = CouponTbl