const Router = require("express").Router();
const {
  validateRequest,
  validcourseId,
  createValidation,
  updateValidation,
} = require("../middleware/courseValidation");

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../Controllers/Course");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/userRoles");
Router.route("/")
  .get(getCourses)
  .post(verifyToken, createValidation, validateRequest, addCourse);

Router.route("/:courseId")
  .get(validcourseId, validateRequest, getCourse)
  .patch(
    verifyToken,
     allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    validcourseId,
    updateValidation,
    validateRequest,
    updateCourse
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    validcourseId,
    validateRequest,
    deleteCourse
  );

module.exports = Router;
