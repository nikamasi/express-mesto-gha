const { StatusCodes } = require('http-status-codes');
const BadRequestError = require('../errors/BadRequestError');
const AccessDeniedError = require('../errors/AccessDeniedError');
const NotFoundError = require('../errors/NotFoundError');
const ServerError = require('../errors/ServerError');
const Card = require('../models/card');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      next(new ServerError());
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ owner, name, link })
    .then((card) => {
      res.status(StatusCodes.CREATED).send(card);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        next(new BadRequestError(e.message));
      } else {
        next(new ServerError());
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((cardFound) => {
      if (!cardFound) {
        return next(new NotFoundError('A picture with this id does not exist'));
      }
      if (cardFound.owner.toString() !== req.user._id) {
        return next(new AccessDeniedError('Not allowed to remove other users pictures'));
      }
      return Card.findByIdAndRemove(cardId)
        .then((data) => res.send(data));
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Invalid id'));
      } else {
        next(new ServerError());
      }
    });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('A picture with this id does not exist'));
      }
      return res.send({ message: data });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Invalid id'));
      } else {
        next(new ServerError());
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        return next(new NotFoundError('A picture with this id does not exist'));
      }
      return res.send(data);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        next(new BadRequestError('Invalid id'));
      } else {
        next(new ServerError());
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
