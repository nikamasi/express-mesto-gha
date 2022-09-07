const express = require('express');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const { cardsRouter } = require('./routes/cards');
const { usersRouter } = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '631797b3817c8b22121274ec',
  };
  next();
});
app.use(express.json());

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((req, res) => {
  res.status(StatusCodes.NOT_FOUND).send({ message: 'Not found' });
});

app.listen(PORT);
