const { StatusCodes } = require('http-status-codes');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch((e) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: e.message });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ owner, name, link })
    .then((card) => {
      res.status(StatusCodes.CREATED).send(card);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: e.message });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: e.message });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((data) => {
      if (!data) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: 'A picture with this id does not exist' });
      }
      return res.send(data);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Invalid id' });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: e.message });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: 'A picture with this id does not exist' });
      }
      return res.send({ message: data });
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Invalid id' });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: e.message });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((data) => {
      if (!data) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .send({ message: 'A picture with this id does not exist' });
      }
      return res.send(data);
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Invalid id' });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: e.message });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
