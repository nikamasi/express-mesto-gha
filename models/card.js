const mongoose = require('mongoose');
const { urlRegex } = require('../utils/regex');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Required field'],
    minLength: [2, 'Minimum 2 characters'],
    maxLength: [30, 'Maximum 30 characters'],
  },
  link: {
    type: String,
    required: [true, 'Required field'],
    match: [urlRegex, 'Enter a valid URL'],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Required field'],
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
