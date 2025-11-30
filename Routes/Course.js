const Router = require("express").Router();
const {
  validateRequest,
  validcourseId,
  createValidation,
} = require("../middleware/courseValidation");

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
} = require("../Controllers/Course");
Router.route("/")
  .get(getCourses)
  .post(createValidation, validateRequest, addCourse);

Router.route("/:courseId")
  .get(validcourseId, validateRequest, getCourse)
  .patch(validcourseId,validateRequest,updateCourse);

module.exports = Router;
