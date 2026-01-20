const lectureModel = require("../Models/lecture");
const courseModel = require("../Models/Course");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");
const getLectures = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.courseId;
  const lectures = await lectureModel.find({ course: courseId });
  if (lectures.length === 0) {
    return next(new AppError("Lecture not found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { lectures } });
});
const getLecture = asyncWrapper(async (req, res, next) => {
  const { courseId, lectureId } = req.params;
  const lecture = await lectureModel
    .findOne({
      _id: lectureId,
      course: courseId,
    })
    .populate("course");
  if (!lecture) {
    return next(new AppError("Lecture not found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { lecture } });
});
const addLecture = asyncWrapper(async (req, res, next) => {
  const { title, course, videoUrl, duration, freePreview, resources } =
    req.body;
  const lectureExist = await lectureModel.findOne({
    $or: [{ title }, { videoUrl }],
  });
  if (lectureExist) {
    return next(
      new AppError("lecture already exist", 400, httpStatusText.FAIL),
    );
  }
  const courseExist = await courseModel.findOne({
    _id: course,
    instructor: req.user.id,
  });
  if (!courseExist) {
    return next(
      new AppError("Invalid Course or Cannot add Lecture in this Course"),
    );
  }
  const lecture = await lectureModel.create({
    title,
    course,
    videoUrl,
    duration,
    freePreview,
    resources,
  });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { lecture } });
});
const updateLecture = asyncWrapper(async (req, res, next) => {
  const lectureId = req.params.lectureId;
  const { title, videoUrl, duration, freePreview, resources } = req.body;
  const lecture = await lectureModel.findOne({ _id: lectureId });
  if (!lecture) {
    return next(new AppError("Invalid Lecture"));
  }
  const courseId = lecture.course;
  const course = await courseModel.findOne({
    _id: courseId,
    instructor: req.user.id,
  });
  if (!course) {
    return next(
      new AppError("Invalid Course or Cannot add Lecture in this Course"),
    );
  }
  const updateLecture = await lectureModel.findByIdAndUpdate(
    lectureId,
    {
      $set: {
        title,
        videoUrl,
        duration,
        freePreview,
        resources,
      },
    },
    { new: true },
  );
  if (!updateLecture) {
    return next(new AppError("Lecture not found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: updateLecture });
});
const deleteLecture = asyncWrapper(async (req, res, next) => {
  const lectureId = req.params.lectureId;

  const lecture = await lectureModel.find({ _id: lectureId });
  if (lecture.length === 0) {
    return next(new AppError("Invalid Lecture"));
  }
  const courseId = lecture.course;
  const course = await courseModel.find({
    _id: courseId,
    instructor: req.user.id,
  });
  if (course.length === 0) {
    return next(
      new AppError("Invalid Course or Cannot delete Lecture in this Course"),
    );
  }

  const deletedLecture = await lectureModel.findByIdAndDelete(lectureId);
  if (!deletedLecture) {
    return next(new AppError("lecture is Not Found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Deleted lecture Success",
  });
});
module.exports = {
  getLectures,
  addLecture,
  updateLecture,
  deleteLecture,
  getLecture,
};
