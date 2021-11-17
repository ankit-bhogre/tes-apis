const dotenv = require('dotenv');
dotenv.config();

if (process.env.NODE_ENV === "development") {
	var dbConfig = {		 
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'talk_electrical'		 
	}
	var TABLES_PREFIX = 'tes_';
	var FRONTEND_URL = 'http://localhost:3000/';
}
if (process.env.NODE_ENV === "production") {
  	var dbConfig = {		 
		host: '45.130.228.52',
		user: 'u209545598_tes',
		password: '8+EvZNE=M*Wu',
		database: 'u209545598_tes'		 
	}
	var TABLES_PREFIX = 'tes_';
	var FRONTEND_URL = 'http://localhost:3000/';
}

module.exports = {dbConfig, FRONTEND_URL, TABLES_PREFIX};
//module.exports = dbConfig;