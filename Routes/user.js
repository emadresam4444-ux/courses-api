const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../Controllers/user");
const {} = require("../middleware/userValidation");

const Router = require("express").Router();
Router.route("/").get(getUsers).post(addUser);
Router.route("/:userId").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = Router;
