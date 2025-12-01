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

Router.route("/")
  .get(verifyToken, getCourses)
  .post(verifyToken, createValidation, validateRequest, addCourse);

Router.route("/:courseId")
  .get(verifyToken, validcourseId, validateRequest, getCourse)
  .patch(
    verifyToken,
    validcourseId,
    updateValidation,
    validateRequest,
    updateCourse
  )
  .delete(verifyToken, validcourseId, validateRequest, deleteCourse);

module.exports = Router;
