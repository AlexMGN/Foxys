const { HttpError } = require('mono-core')
const { getFindOptions } = require('mono-mongodb')

const cards = require('./cards.service')

exports.createCard = async (req, res) => {
	cards.get({
		number: req.body.number
	}).then(function (user) {
		if (user) {
			res.json('Cette carte existe déjà');
		} else {
			cards.create({
				number: req.body.number,
				name: req.body.name
			})
			res.json(req.body)
		}
	})
}

exports.listCards = async (req, res) => {
	const options = getFindOptions(req.query)
	const Cards = await cards.find({}, options).toArray()
	res.json(Cards)
}

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
