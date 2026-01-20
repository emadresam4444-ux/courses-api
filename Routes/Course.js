const Router = require("express").Router();
const {
  validcourseId,
  createValidation,
  updateValidation,
} = require("../middleware/validation/courseValidation");
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../Controllers/Course");
const {validateRequest,preventEmptyReq} = require("../middleware/validation/globalValidator");
const verifyToken = require("../middleware/verifyToken");
const allowedTo = require("../middleware/allowedTo");
const userRoles = require("../utils/userRoles");

Router.route("/")
  .get(getCourses)
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    preventEmptyReq,
    createValidation,
    validateRequest,
    addCourse,
  );

Router.route("/:courseId")
  .get(validcourseId, validateRequest, getCourse)
  .patch(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    preventEmptyReq,
    validcourseId,
    updateValidation,
    validateRequest, 
    updateCourse,
  )
  .delete(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.INSTRUCTOR),
    validcourseId,
    validateRequest,
    deleteCourse,
  );

module.exports = Router;
