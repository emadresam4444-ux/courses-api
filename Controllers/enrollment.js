const EnrollmentModel = require("../Models/enrollment");
const userModel = require("../Models/user");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");

const enrollment = asyncWrapper(async (req, res, next) => {
  const { courseId } = req.body; //validation ObjectId
  const userId = req.user.id;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404, httpStatusText.FAIL));
  }
  const alreadyEnrolled = await EnrollmentModel.findOne({
    userId,
    courseId,
  });
  if (alreadyEnrolled) {
    return next(
      new AppError(
        "User already Enrolled in this course",
        404,
        httpStatusText.FAIL,
      ),
    );
  }
  await EnrollmentModel.create({
    userId,
    courseId,
  });
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "Enrollment Succesfully",
  });
});

const getEnrollment = asyncWrapper(async (req, res, next) => {
    userId=req.user.id;
    const Enrollment= await EnrollmentModel.find({
        userId
    }).populate('userId courseId')
    if(!Enrollment)
    {
        return next(new AppError("User don't have any enrollments",404,httpStatusText.FAIL));
    }
    res.status(200).json({
    status: httpStatusText.SUCCESS,
    data:Enrollment,
});

});

module.exports = { enrollment, getEnrollment };
