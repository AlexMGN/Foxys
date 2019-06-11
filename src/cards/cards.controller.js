const { HttpError } = require('mono-core');
const Session = require('../session/session.service');
const { getFindOptions } = require('mono-mongodb');

const cards = require('./cards.service');

exports.createCard = async (req, res) => {
	cards.get({
		number: req.body.number
	}).then(async function (user) {
		if (user) {
			res.json('Cette carte existe déjà');
		} else {
			const token = await Session.get({ token: req.headers.authorization });
			if (!token) {
				return res.status(400).send('Invalid token');
			}

			cards.create({
				userId: token.userId,
				number: req.body.number,
				name: req.body.name,
				img: JSON.img
			});

			try {
				res.send({ post: req.body });
			} catch (e) {
				res.status(400).send(e);
			}
		}
	})
};

exports.listCards = async (req, res) => {
	const token = await Session.get({ token: req.headers.authorization });
	const options = getFindOptions(req.query);
	const card = await cards.find({ userId: token.userId }, options).toArray();

	if (!card) {
		return res.status(400).send('Invalid Token');
	}
	res.json(card);
};

exports.getCard = async (req, res) => {
	const card = await cards.get(req.params.id)
	if (!card) throw new HttpError('User not found', 404)
	res.json(card)
}

exports.updateCard = async (req, res) => {
	const card = await cards.update(req.params.id, req.body)
	if (!card) throw new HttpError('User not found', 404)
	res.json(card)
}

exports.deleteCard = async (req, res) => {
	const cardDeleted = await cards.delete(req.params.id)
	if (!cardDeleted) throw new HttpError('User not found', 404)
	res.sendStatus(200)
}
