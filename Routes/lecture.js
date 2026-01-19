const Router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/userRoles");
const {
  getLectures,
  addLecture,
  updateLecture,
  deleteLecture,
  getLecture,
} = require("../Controllers/lecture");
const {
  createValidation,
  updateValidation,
} = require("../middleware/validation/lectureValidation");
const preventEmptyReq = require("../middleware/validation/preventEmptyReq");
Router.route("/").post(
  verifyToken,
  allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
  preventEmptyReq,
  createValidation,
  addLecture,
);
Router.route("/:lectureId")
  .patch(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    preventEmptyReq,
    updateValidation,
    updateLecture,
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    deleteLecture,
  );
Router.route("/course/:courseId").get(
  verifyToken,
  allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
  getLectures,
);
Router.route("/:lectureId/course/:courseId/").get(
  verifyToken,
  allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
  getLecture,
);
module.exports = Router;
