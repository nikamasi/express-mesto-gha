const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((e) => res.status(500).send({ message: e.message }));
};

const getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send({ message: 'A user with this id does not exist' });
      }
    })
    .catch((e) => {
      if (e.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid id' });
      }
      return res.status(400).send({ message: e.message });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        res.status(400).send({ message: e.message });
      }
      res.status(500).send({ message: e.message });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  if (!name && !about) {
    res.status(400).send({ message: "'name' or 'about' fields are required" });
    return;
  }
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch((e) => {
      if (e.name === 'ValidationError') {
        return res.status(400).send({ message: e.message });
      }
      return res.status(500).send({ message: e.message });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(400).send({ message: "'avatar' field is required" });
    return;
  }
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .then((data) => res.send({ data }))
    .catch((e) => {
      res.status(500).send({ message: e.message });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
