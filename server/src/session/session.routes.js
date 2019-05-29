const usersValidation = require('./session.validation');
const usersCtrl = require('./session.controller');
const jwt = require('jsonwebtoken');
const production = require('../../conf/production').mono.jwt.secret;

module.exports = [
	{
		method: 'GET',
		path: '/cards',
		session: true,
		handler(req, res, next) {
			const token = req.header('Authorization');
			if (!token) return res.status(401).send('Access Denied');

			try {
				const verified = jwt.verify(token, production);
				req.user = verified;
				next();
			} catch (e) {
				res.status(400).send('Invalid Token')
			}
		}
	},
	{
		method: 'GET',
		path: '/tokens/:id',
		validation: usersValidation.getUser,
		handler: usersCtrl.getUser
	},
	{
		method: 'PUT',
		path: '/tokens/:id',
		validation: usersValidation.updateUser,
		handler: usersCtrl.updateUser
	},
	{
		method: 'DELETE',
		path: '/tokens/:id',
		validation: usersValidation.deleteUser,
		handler: usersCtrl.deleteUser
	}
];
