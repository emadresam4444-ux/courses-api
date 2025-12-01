const Router = require("express").Router();
const { register, login } = require("../Controllers/auth");

Router.post("/login", login);

Router.post("/register", register);

module.exports = Router;
