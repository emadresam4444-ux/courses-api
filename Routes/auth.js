const Router = require("express").Router();
const { register, login } = require("../Controllers/auth");
const upload = require("../middleware/uploadFile/uploadProfileImage");
Router.route("/login").post(login);

Router.route("/register").post(upload.single("profileImage"), register);

module.exports = Router;
