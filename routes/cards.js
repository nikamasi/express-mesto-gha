const express = require("express");
const cardsRouter = express.Router();
const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require("../controllers/cards")

cardsRouter.get("/", getCards)
cardsRouter.post("/", express.json(), createCard)
cardsRouter.delete("/:cardId", express.json(), deleteCard)
cardsRouter.put("/:cardId/likes", express.json(), likeCard)
cardsRouter.delete("/:cardId/likes", express.json(), dislikeCard)

module.exports = {
  cardsRouter
}
