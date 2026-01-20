const courseModel = require("../Models/Course");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");
const getCourses = asyncWrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const courses = await courseModel
    .find({}, { __v: false })
    .limit(limit)
    .skip(skip).populate('instructor');
  if (courses.length === 0) {
    return next(new AppError("Courses is Not Found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { courses } });
});
const getCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const course = await courseModel.findOne({
    _id: courseId,
  }).populate('instructor');
  if (!course) {
    return next(new AppError("Course is Not Exist", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { course } });
});
const addCourse = asyncWrapper(async (req, res, next) => {
  const { title, price, description, isPublished } = req.body;
  const instructor=req.user.id;
  const existcourse = await courseModel.findOne({title , instructor});
  if (existcourse) {
    return next(new AppError("Course already exist", 400, httpStatusText.FAIL));
  }
  const course = await courseModel.create({
    title,
    price,
    instructor: req.user.id,
    description,
    isPublished,
  });
  res.status(201).json({ status: httpStatusText.SUCCESS, data: course });
});
const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const{title,price,description,isPublished}=req.body;
  const UpdatedCourse = await courseModel.findOneAndUpdate(
    { _id: courseId, instructor: req.user.id },
    { $set: {title,price,description,isPublished} },
    { new: true }
  );
  if (!UpdatedCourse) {
    return next(new AppError("Course is Not Found", 404, httpStatusText.FAIL));
  }
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { UpdatedCourse } });
});
const deleteCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const deletedCourse = await courseModel.findByOneAndDelete({
    _id: courseId,
    instructor: req.user.id,
  });
  if (!deletedCourse) {
    return next(new AppError("Course is Not Found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Deleted Course Success",
  });
});
module.exports = {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
