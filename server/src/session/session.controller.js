const { HttpError } = require('mono-core');
const { getFindOptions } = require('mono-mongodb');

const User = require('./session.service');

exports.listUsers = async (req, res) => {
	const options = getFindOptions(req.query);
	const Users = await User.find({}, options).toArray();
	res.json(Users)
};

exports.getUser = async (req, res) => {
	const user = await User.get(req.params.id)
	if (!user) throw new HttpError('User not found', 404);
	res.json(user)
};

exports.updateUser = async (req, res) => {
	const user = await User.update(req.params.id, req.body);
	if (!user) throw new HttpError('User not found', 404);
	res.json(user)
};

exports.deleteUser = async (req, res) => {
	const userDeleted = await User.delete(req.params.id);
	if (!userDeleted) throw new HttpError('User not found', 404);
	res.sendStatus(200)
};
