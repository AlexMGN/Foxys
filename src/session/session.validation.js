/*
** See https://terrajs.org/mono/routes#validation
*/
const Joi = require('joi'); // joi is a dependency of mono
const { findValidation } = require('mono-mongodb'); // See https://github.com/terrajs/mono-mongodb#utils

exports.createUser = {
	body: Joi.object().keys({
	})
};

exports.connectUser = {
	body: Joi.object().keys({
	})
};

exports.listUsers = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	}),
	query: Joi.object().keys(findValidation)
}

exports.getUser = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	})
}

exports.updateUser = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	})
}

exports.deleteUser = {
	params: Joi.object().keys({
		_id: Joi.string().length(24).alphanum()
	})
}
