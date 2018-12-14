/*
** See https://terrajs.org/mono/routes#validation
*/
const Joi = require('joi') // joi is a dependency of mono
const { findValidation } = require('mono-mongodb') // See https://github.com/terrajs/mono-mongodb#utils

exports.createUser = {
	body: Joi.object().keys({
		username: Joi.string().min(5).required().trim(),
		email: Joi.string().email({ minDomainAtoms: 2 }).required().trim(),
		password: Joi.string().min(6).required().trim(),
		confirmPass: Joi.string().trim().required().valid(Joi.ref('password')).options({
			language: {
				any: {
					allowOnly: 'No match passwords',
				}
			}
		})
	})
}

exports.connectUser = {
	body: Joi.object().keys({
		email: Joi.string().email({ minDomainAtoms: 2 }).required().trim(),
		password: Joi.string().required().trim(),
	})
}

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
