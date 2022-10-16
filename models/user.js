const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const { urlRegex } = require('../utils/regex');
const BadRequestError = require('../errors/BadRequestError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Minimum 2 characters'],
    maxlength: [30, 'Maximum 30 characters'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Minimum 2 characters'],
    maxlength: [30, 'Maximum 30 characters'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    match: [urlRegex, 'Enter a valid URL'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Enter a valid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').then((user) => {
    if (!user) {
      return Promise.reject(new BadRequestError('Неправильные почта или пароль'));
    }
    return bcrypt.compare(password, user.password).then((matched) => {
      if (!matched) {
        return Promise.reject(new BadRequestError('Неправильные почта или пароль'));
      }
      return user;
    });
  });
};

module.exports = mongoose.model('user', userSchema);
