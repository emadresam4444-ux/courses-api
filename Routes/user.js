const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../Controllers/user");
const {} = require("../middleware/userValidation");
const verifyToken = require("../middleware/verifyToken");
const Router = require("express").Router();
Router.route("/").get(verifyToken, getUsers).post(verifyToken, addUser);
Router.route("/:userId")
  .get(verifyToken, getUser)
  .patch(verifyToken, updateUser)
  .delete(verifyToken, deleteUser);
module.exports = Router;
