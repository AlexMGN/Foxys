const { HttpError } = require('mono-core')
const { getFindOptions } = require('mono-mongodb')

const jwt = require('express-jwt-session')
const production = require('../../conf/production').secret


const bcrypt = require('bcryptjs')

const users = require('./users.service')
const express = require('express')
const app = express();


app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Function for connect
function createToken(user) {
	return jwt.signToken({ email: user.email }, production, 150);
}

exports.createUser = async (req, res) => {
	users.get({
		email: req.body.email
	}).then(function (user) {
		if (user) {
			res.json('Email déjà existant.');
		} else {
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(req.body.password, salt, (err, passwordCrypt) => {
					req.body.token = jwt.signToken({ email: req.body.email }, production, 150)
					users.create({
						token: req.body.token,
						username: req.body.username,
						email: req.body.email,
						password: passwordCrypt,
					})
				})
			})
			res.json(req.body)
		}
	})
}

exports.connectUser = async (req, res) => {
	users.get({
		email: req.body.email
	}).then(function (user) {
		if (!user) {
			console.log('Il n\'y a aucun utilisateur pour cette adresse email');
		} else {
			bcrypt.compare(req.body.password, user.password, function (err, isMatch) {
				if (isMatch) {
					console.log('Pass match');
					res.json({
						token: createToken(user)
					})
				} else {
					res.redirect('/');
				}
			})
		}
	})
}

exports.listUsers = async (req, res) => {
	const options = getFindOptions(req.query)
	const Users = await users.find({}, options).toArray()
	res.json(Users)
}

exports.getUser = async (req, res) => {
	const user = await users.get(req.params.id)
	if (!user) throw new HttpError('User not found', 404)
	res.json(user)
}

exports.updateUser = async (req, res) => {
	const user = await users.update(req.params.id, req.body)
	if (!user) throw new HttpError('User not found', 404)
	res.json(user)
}

exports.deleteUser = async (req, res) => {
	const userDeleted = await users.delete(req.params.id)
	if (!userDeleted) throw new HttpError('User not found', 404)
	res.sendStatus(200)
}
