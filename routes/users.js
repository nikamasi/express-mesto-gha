const express = require('express');

const usersRouter = express.Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { urlRegex } = require('../utils/regex');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getCurrentUser);

usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().required(),
  }),
}), getUserById);

usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).or('name', 'about'),
}), updateUser);

usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegex),
  }),
}), updateAvatar);

module.exports = {
  usersRouter,
};
