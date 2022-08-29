const userController = require("../controls/userControl");

const route = require("express").Router();

route.post("/adduser", userController.createUser);
route.get("/userevent/:id", userController.findOneUserEvent);

module.exports = route;
