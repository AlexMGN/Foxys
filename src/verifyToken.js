const jwt = require('jsonwebtoken');
const production = require('../conf/production').mono.jwt.secret;

module.exports = function (req, res, next) {
	const token = req.header('Authorization');
	if (!token) return res.status(401).send('Access Denied');

	try {
		const verified = jwt.verify(token, production);
		req.user = verified;
		next();
	} catch (e) {
		res.status(400).send('Invalid Token')
	}
};
