const EnrollmentModel = require("../Models/enrollment");
const userModel = require("../Models/user");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");

const enrollment = asyncWrapper(async (req, res, next) => {
  const { course } = req.body;
  const userId = req.user.id;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 404, httpStatusText.FAIL));
  }
  const alreadyEnrolled = await EnrollmentModel.findOne({
    user:userId,
    course,
  });
  if (alreadyEnrolled) {
    return next(
      new AppError(
        "User already Enrolled in this course",
        400,
        httpStatusText.FAIL,
      ),
    );
  }
  await EnrollmentModel.create({
    user:userId,
    course,
  });
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    message: "Enrolled successfully",
  });
});

const getEnrollment = asyncWrapper(async (req, res, next) => {
   const userId=req.user.id;
    const enrollment= await EnrollmentModel.find({
        user:userId
    }).populate('user course')
    if(enrollment.length===0)
    {
        return next(new AppError("User don't have any enrollments",404,httpStatusText.FAIL));
    }
    res.status(200).json({
    status: httpStatusText.SUCCESS,
    data:enrollment,
});

});

module.exports = { enrollment, getEnrollment };
