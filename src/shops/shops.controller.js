const { HttpError } = require('mono-core');
const Shop = require('../shops/shops.service');
const { getFindOptions } = require('mono-mongodb');

const shops = require('./shops.service');

exports.createShop = async (req, res) => {
	Shop.get({
		name: req.body.name
	}).then(async function (shop) {

		Shop.create({
			name: req.body.name,
			img: req.body.img
		});

		try {
			res.send({shop});
		} catch (e) {
			res.status(400).send(e);
		}
	})
};

exports.listShops = async (req, res) => {
	const token = await Shop.get({ token: req.headers.authorization });
	const options = getFindOptions(req.query);
	const shop = await shops.find({ userId: token.userId }, options).toArray();

	if (!shop) {
		return res.status(400).send('Invalid Token');
	}
	res.json(shop);
};

exports.getShop = async (req, res) => {
	const shop = await shops.get(req.params.id)
	if (!shop) throw new HttpError('User not found', 404)
	res.json(shop)
}

exports.updateShop = async (req, res) => {
	const shop = await shops.update(req.params.id, req.body)
	if (!shop) throw new HttpError('User not found', 404)
	res.json(shop)
}

exports.deleteShop = async (req, res) => {
	const shopDeleted = await shops.delete(req.params.id)
	if (!shopDeleted) throw new HttpError('User not found', 404)
	res.sendStatus(200)
}
