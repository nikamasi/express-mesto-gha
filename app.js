const express = require('express');
const path = require("path");
const { cardsRouter } = require("./routes/cards");
const { usersRouter } = require("./routes/users");

const { PORT = 3000 } = process.env;

const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '631797b3817c8b22121274ec'
  };
  next();
});
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);


app.listen(PORT, () => {
  console.log(`Server started: ${PORT}.`)
})

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false
})
