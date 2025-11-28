const Router = require("express").Router();
const {
  validateRequest,
  validcourseId,
  createValidation,
} = require("../middleware/courseValidation");

const { getCourses, getCourse, addCourse } = require("../Controllers/Course");
Router.route("/")
  .get(getCourses)
  .post(createValidation, validateRequest, addCourse);

Router.route("/:courseId").get(validcourseId, validateRequest, getCourse);

module.exports = Router;
