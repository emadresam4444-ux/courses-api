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

Router.route("/")
  .get(getCourses)
  .post(createValidation, validateRequest, addCourse);

Router.route("/:courseId")
  .get(validcourseId, validateRequest, getCourse)
  .patch(validcourseId, updateValidation, validateRequest, updateCourse)
  .delete(validcourseId, validateRequest, deleteCourse);

module.exports = Router;
