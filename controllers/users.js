const { StatusCodes } = require('http-status-codes');
const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'A user with this id does not exist' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: 'Invalid id' });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.status(StatusCodes.CREATED).send(data);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: e.message });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  if (!name && !about) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "'name' or 'about' fields are required" });
    return;
  }
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found' });
      }
      return res.send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(StatusCodes.BAD_REQUEST).send({ message: e.message });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(StatusCodes.BAD_REQUEST).send({ message: "'avatar' field is required" });
    return;
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(StatusCodes.NOT_FOUND).send({ message: 'User not found' });
      }
      return res.send({ data });
    })
    .catch(() => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
