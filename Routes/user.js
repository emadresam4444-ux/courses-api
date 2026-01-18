const {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  changeUserRole,
  uploadProfileImage,
} = require("../Controllers/user");
const {
  validateRequest,
  validuserid,
  createValidation,
  updateValidation,
  validRole,
} = require("../middleware/userValidation"); //not completed
const upload = require("../middleware/uploadFile/uploadProfileImage");
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
    addUser,
  );
Router.route("/:userId")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    validuserid,
    validateRequest,
    getUser,
  )
  .patch(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    validuserid,
    updateValidation,
    validateRequest,
    updateUser,
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN),
    validuserid,
    validateRequest,
    deleteUser,
  );
Router.route("/role/:userId").patch(
  verifyToken,
  allowedTo(userRoles.ADMIN),
  validuserid,
  validRole,
  validateRequest,
  changeUserRole,
);
Router.route("/profile/upload").post(
  verifyToken,
  upload.single("profile"),
  uploadProfileImage,
);
module.exports = Router;
