const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minLength: [2, 'Минимальная длина - 2 символа'],
    maxLength: [30, 'Максимальная длина - 30 символов'],
  },
  link: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Обязательное поле'],
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('card', cardSchema);
