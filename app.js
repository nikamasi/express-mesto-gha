const express = require('express');
const path = require("path");
const { cardsRouter } = require("./routes/cards");
const { usersRouter } = require("./routes/users");

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

req.user = {
  _id: '5d8b8592978f8bd833ca8133'
};


app.listen(PORT, () => {
  console.log(`Server started: ${PORT}.`)
})

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: false
})
