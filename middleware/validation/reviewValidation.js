const { body, param } = require("express-validator");
const asyncWrapper = require("../asyncWrapper");
const EnrollmentModel = require("../../Models/enrollment");
const reviewModel = require("../../Models/review");
const AppError = require("../../utils/customError");
const createReviewValidation = [
  body("course")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid Course ID"),

  body("rating")
    .notEmpty()
    .withMessage("Rating is required")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("comment")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ min: 4, max: 500 })
    .withMessage("Comment must be between 5 and 500 characters"),
];

const updateReviewValidation = [
  body("rating")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5"),

  body("comment")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Comment cannot be empty if provided")
    .isLength({ min: 4, max: 500 })
    .withMessage("Comment must be between 4 and 500 characters"),
];

const validReviewId = [
  param("reviewId")
    .notEmpty()
    .withMessage("Review ID is required")
    .isMongoId()
    .withMessage("Invalid Review ID"),
];
const isEnroll = asyncWrapper(async (req, res, next) => {
  //post--> courseId patch/delete-->reviewId
  const user = req.user.id; 
  let course;
  if (req.body.course) //use in post
  {
    course = req.body.course;
  } else if (req.params.reviewId) //use in  patch/delete
  {
    const reviewId = req.params.reviewId;
    const review = await reviewModel.findById(reviewId);
    course = review.course;
  }
  const EnrollCourse = await EnrollmentModel.findOne({ user, course });
  console.log(EnrollCourse);
  
  if (!EnrollCourse) {
    return next(new AppError("Should enroll in this course to review it"));
  }
  next();
});
module.exports = {
  createReviewValidation,
  updateReviewValidation,
  validReviewId,
  isEnroll,
};
