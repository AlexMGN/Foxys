/*
** See https://terrajs.org/mono/routes#validation
*/
const Joi = require('joi') // joi is a dependency of mono
const { findValidation } = require('mono-mongodb') // See https://github.com/terrajs/mono-mongodb#utils

exports.createShop = {
	body: Joi.object().keys({
		userId: Joi.string(),
		name: Joi.string()
			.required(),
		img: Joi.string().required(),
	})
}

exports.listShops = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	}),
	query: Joi.object().keys(findValidation)
}

exports.getShop = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	})
}

exports.updateShop = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum(),
	}),
	body: Joi.object().keys({
		name: Joi.string().required().replace(' ', '').replace('é','e').replace('è','e').replace('à','a').lowercase().regex(/^[a-zA-Z]{3,30}$/),
	})
}

exports.deleteShop = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	})
}
