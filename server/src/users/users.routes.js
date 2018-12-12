const usersValidation = require('./users.validation');
const usersCtrl = require('./users.controller');


module.exports = [
	{
		method: 'POST',
		path: '/users',
		validation: usersValidation.createUser,
		handler: usersCtrl.createUser
	},
	{
		method: 'POST',
		path: '/login',
		validation: usersValidation.connectUser,
		handler: usersCtrl.connectUser,
	},
	{
		method: 'GET',
		path: '/users',
		validation: usersValidation.listUsers,
		handler: usersCtrl.listUsers
	},
	{
		method: 'GET',
		path: '/users/:id',
		validation: usersValidation.getUser,
		handler: usersCtrl.getUser
	},
	{
		method: 'PUT',
		path: '/users/:id',
		validation: usersValidation.updateUser,
		handler: usersCtrl.updateUser
	},
	{
		method: 'DELETE',
		path: '/users/:id',
		validation: usersValidation.deleteUser,
		handler: usersCtrl.deleteUser
	}
]
