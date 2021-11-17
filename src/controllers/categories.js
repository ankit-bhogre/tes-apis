const Category = require('../models/category')

const categoriesController = {
	async list (req, res) {
		try {
			const categories_data = await Category.findAll({
				where: {
					parent_id: 0
				},
				attributes: ['category_id', 'parent_id', 'category_name'],
				order: [
					['category_id', 'asc'],
				]
			});
			var arr = [];
			var newArr = categories_data.map(function(val, index){
				
				arr.push(['cat_id',val['dataValues']['category_id']]);
				//arr.push();
				//console.log({key:index, value:val['dataValues']['category_name']});
			});
			console.log(JSON.stringify(arr));
			/*categories_data.forEach(categories => {
				console.log(categories['dataValues']['category_name']);
			})*/ 
			res.send(JSON.stringify(arr));
		}catch(error) {
			res.status( 400 ).send( error.message );
		}
	},	
	create (req, res) {
		Category.create({ name: "tes test", email: "test@gmail.com" })
		.then( userResponse => {
		  res.status( 200 ).json( userResponse )
		}).catch( error => {
		  res.status( 400 ).send( error )
		})
	},	
	async byId (req, res) {
		try {
			const id = req.params.id;
			const user_details = await Category.findByPk(id);
			res.send(user_details);
		}catch(error) {
			res.status( 400 ).send( error.message );
		} 
	}
};

module.exports = categoriesController;