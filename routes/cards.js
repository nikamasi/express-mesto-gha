const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { urlRegex, mongooseIdRegex } = require('../utils/regex');

const cardsRouter = express.Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().regex(urlRegex).required(),
  }),
}), createCard);

cardsRouter.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(mongooseIdRegex).required(),
  }),
}), dislikeCard);

cardsRouter.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(mongooseIdRegex).required(),
  }),
}), deleteCard);

cardsRouter.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(mongooseIdRegex).required(),
  }),
}), likeCard);

module.exports = {
  cardsRouter,
};
