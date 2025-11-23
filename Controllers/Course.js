const courseModel = require("../Models/Course");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");

const getCourses = asyncWrapper(async (req, res, next) => {
  const courses = await courseModel.find();
  if (courses.length === 0) {
    return res.status(200).json({ status: httpStatusText.FAIL,  message: "No courses found" });
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: courses });
});
const getCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await courseModel.findById(courseId);
  if (!course) {
    return res.status(200).json({ status: httpStatusText.FAIL, data: course });
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: course });
});
const addCourse = asyncWrapper(async (req, res, next) => {
  const { title, price, instructor, description, isPublished } = req.body;
  const existcourse = await courseModel.findOne({
    title,
    instructor,
  });
  if (existcourse) {
    return res
      .status(400)
      .json({ status: httpStatusText.FAIL, message: "Course already exist" });
  }
  const course = await courseModel.create({
    title,
    price,
    instructor,
    description,
    isPublished,
  });
  res.status(201).json({ status: httpStatusText.SUCCESS, data: course });
});
module.exports = { getCourses, getCourse, addCourse };
