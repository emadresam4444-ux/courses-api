const Router = require("express").Router();
const { register, login } = require("../Controllers/auth");
const upload = require("../middleware/uploadFile/uploadProfileImage");
const {
  validateRequest,
  createValidation,
  updateValidation,
  validateStrongPassword
} = require("../middleware/userValidation");
Router.route("/login").post(login);
Router.route("/register").post(createValidation,validateStrongPassword,validateRequest,register);

module.exports = Router;
