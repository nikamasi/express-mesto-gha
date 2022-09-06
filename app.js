const express = require('express');
const path = require("path");
const { cardsRouter } = require("./routes/cards");
const { usersRouter } = require("./routes/users");

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   console.log("here")
// })
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
