const Router = require("express").Router();
const { register, login } = require("../Controllers/auth");
const {
  createValidation,validateStrongPassword,} = require("../middleware/validation/userValidation");
const {validateRequest} = require("../middleware/validation/globalValidator");
Router.route("/login").post(login);
Router.route("/register").post(
  createValidation,
  validateStrongPassword,
  validateRequest,
  register,
);

module.exports = Router;
