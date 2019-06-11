const { HttpError } = require('mono-core');
const Session = require('../session/session.service');
const { getFindOptions } = require('mono-mongodb');

const cards = require('./cards.service');
const shop = require('../shops/shops.service');

exports.createCard = async (req, res) => {

	const token = await Session.get({ token: req.headers.authorization });
	if (!token) {
		return res.status(400).send('Invalid token');
	}

	console.log(token.userId);
	cards.get({
		userId: token.userId
	}).then(async function (cardUser) {
		console.log(cardUser);
		if (cardUser) {
			cards.get({
				name: req.body.name
			}).then(card => {
				if (card) {
					res.json('Cette carte existe déjà');
				} else {
					shop.get({
						name: req.body.name
					}).then(shop => {
						cards.create({
							userId: token.userId,
							number: req.body.number,
							name: shop.name,
							img: shop.img
						});
						try {
							res.send({post: req.body});
						} catch (e) {
							res.status(400).send(e);
						}
					});

				}
			})
		} else {
			shop.get({
				name: req.body.name
			}).then(shop => {
				cards.create({
					userId: token.userId,
					number: req.body.number,
					name: shop.name,
					img: shop.img
				});
				try {
					res.send({post: req.body});
				} catch (e) {
					res.status(400).send(e);
				}
			});
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
