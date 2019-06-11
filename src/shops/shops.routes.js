const shopsValidation = require('./shops.validation');
const shopsCtrl = require('./shops.controller');


module.exports = [
	{
		method: 'POST',
		path: '/shops',
		validation: shopsValidation.createShop,
		handler: shopsCtrl.createShop
	},
	{
		method: 'GET',
		path: '/shops',
		validation: shopsValidation.listShops,
		handler: shopsCtrl.listShops
	},
	{
		method: 'GET',
		path: '/shops/:id',
		validation: shopsValidation.getShop,
		handler: shopsCtrl.getShop
	},
	{
		method: 'PUT',
		path: '/shops/:id',
		validation: shopsValidation.updateShop,
		handler: shopsCtrl.updateShop
	},
	{
		method: 'DELETE',
		path: '/shops/:id',
		validation: shopsValidation.deleteShop,
		handler: shopsCtrl.deleteShop
	}
]
