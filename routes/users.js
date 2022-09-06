const express = require("express");
const usersRouter = express.Router();
const { getUsers, createUser, getUserById, updateUser, updateAvatar } = require("../controllers/users")

usersRouter.get("/", getUsers)
usersRouter.get("/:userId", getUserById)
usersRouter.post("/", express.json(), createUser)
usersRouter.patch("/me", express.json(), updateUser)
usersRouter.patch("/me/avatar", express.json(), updateAvatar)

module.exports = {
  usersRouter
}
