const courseModel = require("../Models/Course");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");
const getCourses = asyncWrapper(async (req, res, next) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const skip = (page - 1) * limit;
  const courses = await courseModel
    .find({}, { __v: false, createdAt: 0, updatedAt: 0 })
    .limit(limit)
    .skip(skip);
  if (courses.length === 0) {
    return next(new AppError("Courses is Not Found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
});
const getCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await courseModel.findById(courseId);
  if (!course) {
    return next(new AppError("Course is Not Exist", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
});
const addCourse = asyncWrapper(async (req, res) => {
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
