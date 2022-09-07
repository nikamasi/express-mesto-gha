const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ owner, name, link })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({ message: e.message });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  // eslint-disable-next-line consistent-return
  Card.findById(cardId).then((card) => {
    if (card.owner !== req.user._id) {
      return res
        .status(403)
        .send({ message: 'Only the owner can delete the picture.' });
    }
    Card.findByIdAndRemove(cardId)
      .then((data) => {
        if (!data) {
          return res
            .status(400)
            .send({ message: 'A picture with this id does not exist' });
        }
        return res.status(204).send({});
      })
      .catch((e) => res.status(500).send({ message: e.message }));
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
          .status(400)
          .send({ message: 'A picture with this id does not exist' });
      }
      return res.status(200).send({ message: data });
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
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
          .status(400)
          .send({ message: 'A picture with this id does not exist' });
      }
      return res.status(204).send({});
    })
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
