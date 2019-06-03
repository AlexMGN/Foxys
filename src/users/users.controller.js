const { HttpError } = require('mono-core');
const { getFindOptions } = require('mono-mongodb');

const jwt = require('jsonwebtoken');
const production = require('../../conf/production').mono.jwt.secret;


const bcrypt = require('bcryptjs');

const User = require('./users.service');
const Session = require('../session/session.service');

exports.createUser = (req, res) => {

	User.get({
		email: req.body.email
	}).then(async function (user) {
		if (user) {
			res.json('Email déjà existant.');
		} else {

			const salt = await bcrypt.genSalt(10);
			const hashedPassword = await bcrypt.hash(req.body.password, salt);

			User.create({
				username: req.body.username,
				email: req.body.email,
				password: hashedPassword
			});

			try {
				res.send({ user: req.body });
			} catch (e) {
				res.status(400).send(e);
			}

		}
	})
};

exports.connectUser = (req, res) => {
	User.get({
		email: req.body.email
	}).then(async function (user) {

		const validPass = await bcrypt.compare(req.body.password, user.password);
		if (!validPass) {
			return res.status(400).send('Invalid password');
		}

		//Create and assign session
		const token = jwt.sign({_id: user._id, username: user.username}, production);
		res.header('Authorization', token);

		Session.create({
			userId: user._id,
			token: token,
		});

		try {
			res.send(req.body, token);
		} catch (e) {
			res.status(400).send(e);
		}

	})
};

exports.listUsers = async (req, res) => {
	const options = getFindOptions(req.query);
	const Users = await User.find({}, options).toArray();
	res.json(Users)
};

exports.getUser = async (req, res) => {
	const user = await User.get(req.params.id);
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
