const reviewModel = require("../Models/review");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");

const getReviews = asyncWrapper(async (req, res, next) => {
  const course = req.params.courseId;
  const reviews = await reviewModel.find({ course });
  if (reviews.length===0) {
    return next(
      new AppError("Course don't have reviews", 404, httpStatusText.FAIL),
    );
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: reviews });
});
const getReview = asyncWrapper(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await reviewModel.findOne({
    _id: reviewId,
    user: req.user.id,
  });
  if (!review) {
    return next(
      new AppError("Review not found or you don't have access to it", 404, httpStatusText.FAIL),
    );
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: review });
});
const addReview = asyncWrapper(async (req, res, next) => {
  const { course, rating, comment } = req.body;
  reviewExist = await reviewModel.findOne({ course, user: req.user.id });
  if (reviewExist) {
    return next(
      new AppError(
        "You cannot do more than one review.",
        400,
        httpStatusText.FAIL,
      ),
    );
  }
  const review = await reviewModel.create({
    course,
    user: req.user.id,
    rating,
    comment,
  });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: review });
});
const updateReview = asyncWrapper(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const { rating, comment } = req.body;
  const review = await reviewModel.findByIdAndUpdate(
    { _id: reviewId, user: req.user.id },
    { $set: { rating, comment } },
    { new: true },
  );
  if (!review) {
    return next(new AppError("Review not found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: review });
});
const deleteReview = asyncWrapper(async (req, res, next) => {
  const reviewId = req.params.reviewId;
  const review = await reviewModel.findByIdAndDelete({_id:reviewId,user:req.user.id});
  if (!review) {
    return next(new AppError("Review not found", 404, httpStatusText.FAIL));
  }
  res
    .status(200)
    .json({
      status: httpStatusText.SUCCESS,
      message: "Deleted Review Success",
    });
});
module.exports = {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
};
