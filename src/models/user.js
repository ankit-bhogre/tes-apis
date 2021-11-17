const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const {TABLES_PREFIX} = require('../config');

const User = sequelize.define('Users', {
	userId: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	userEncryptId: {
		type: DataTypes.STRING,
		allowNull: false
	},
	accessToken: {
		type: DataTypes.STRING,
		allowNull: true
	},
	referredBy: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
		allowNull: true
	},
	walletBal: {
		type: DataTypes.STRING,
		allowNull: true
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		validate: {
			isEmail: true,
		}
	},
	contactNo: {
		type: DataTypes.STRING,
		validate: {
			isNumeric: true,
		},
    	allowNull: false,
	},
	password: {
		type: DataTypes.STRING,
    	allowNull: false,
	},
	createDate: {
		type: DataTypes.STRING,
    	allowNull: false,
	},
	createMonth: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	},
	createYear: {
		type: DataTypes.INTEGER,
		validate: {
			isNumeric: true,
		},
    	allowNull: true,
	},
	ipAddress: {
		type: DataTypes.STRING,
		allowNull: true
	},
	lastLogin: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	currentLogin: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	isActive: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	isDeleted: {
		type: DataTypes.INTEGER,
		allowNull: true
	},
	tempForget: {
		type: DataTypes.STRING,
		allowNull: true
	},
	expLinkTime: {
		type: DataTypes.STRING,
		allowNull: true
	}
}, {
	freezeTableName: false,
	tableName: TABLES_PREFIX+'users',
	timestamps: true,
	createdAt: true,
	updatedAt: true
});

/*(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();*/

module.exports = User