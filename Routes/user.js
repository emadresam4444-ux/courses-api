const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
} = require("../Controllers/user");
const {
  validateRequest,
  validuserid,
  createValidation,
  updateValidation,
} = require("../middleware/userValidation"); //not completed
const allowedTo = require("../middleware/allowedTo");
const verifyToken = require("../middleware/verifyToken");
const Router = require("express").Router();
const userRoles = require("../utils/userRoles");
Router.route("/")
  .get(verifyToken, allowedTo(userRoles.ADMIN), validateRequest, getUsers)
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    createValidation,
    validateRequest,
    addUser
  );
Router.route("/:userId")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    validuserid,
    validateRequest,
    getUser
  )
  .patch(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    validuserid,
    updateValidation,
    validateRequest,
    updateUser
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    validuserid,
    validateRequest,
    deleteUser
  );
module.exports = Router;
