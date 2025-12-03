const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../Controllers/user");
const {} = require("../middleware/userValidation"); //not completed
const allowedTo = require("../middleware/allowedTo");
const verifyToken = require("../middleware/verifyToken");
const Router = require("express").Router();
const userRoles = require("../utils/userRoles");
Router.route("/")
  .get(verifyToken, allowedTo(userRoles.ADMIN), getUsers)
  .post(verifyToken, addUser);
Router.route("/:userId")
  .get(verifyToken, allowedTo(userRoles.ADMIN), getUser)
  .patch(verifyToken, allowedTo(userRoles.ADMIN), updateUser)
  .delete(verifyToken, allowedTo(userRoles.ADMIN), deleteUser);
module.exports = Router;
