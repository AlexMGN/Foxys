/*
** See https://terrajs.org/mono/routes#validation
*/
const Joi = require('joi') // joi is a dependency of mono
const { findValidation } = require('mono-mongodb') // See https://github.com/terrajs/mono-mongodb#utils

exports.createCard = {
	body: Joi.object().keys({
		name: Joi.string().required().replace(' ', '').lowercase().regex(/^[a-zA-Z]{3,30}$/),
		number: Joi.number().required()
	})
}

exports.listCards = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	}),
	query: Joi.object().keys(findValidation)
}

exports.getCard = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	})
}

exports.updateCard = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum(),
	}),
	body: Joi.object().keys({
		name: Joi.string().required().replace(' ', '').replace('é','e').replace('è','e').replace('à','a').lowercase().regex(/^[a-zA-Z]{3,30}$/),
	})
}

exports.deleteCard = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	})
}
