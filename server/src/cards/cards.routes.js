const cardsValidation = require('./cards.validation')
const cardsCtrl = require('./cards.controller')


module.exports = [
	{
		method: 'POST',
		path: '/cards',
		validation: cardsValidation.createCard,
		handler: cardsCtrl.createCard
	},
	{
		method: 'GET',
		path: '/cards',
		validation: cardsValidation.listCards,
		handler: cardsCtrl.listCards
	},
	{
		method: 'GET',
		path: '/cards/:id',
		validation: cardsValidation.getCard,
		handler: cardsCtrl.getCard
	},
	{
		method: 'PUT',
		path: '/cards/:id',
		validation: cardsValidation.updateCard,
		handler: cardsCtrl.updateCard
	},
	{
		method: 'DELETE',
		path: '/cards/:id',
		validation: cardsValidation.deleteCard,
		handler: cardsCtrl.deleteCard
	}
]
