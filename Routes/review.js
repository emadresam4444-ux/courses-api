const Router = require("express").Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require("../Controllers/review");
const {
  validateRequest,
  preventEmptyReq,
} = require("../middleware/validation/globalValidator");
const {
  createReviewValidation,
  updateReviewValidation,
  validReviewId,
  isEnroll
} = require("../middleware/validation/reviewValidation");
Router.route("/course/:courseId")
  .get(verifyToken, getReviews);
Router.route('/').post(
    verifyToken,
    preventEmptyReq,
    createReviewValidation,
    validateRequest,
    isEnroll,
    addReview,
  );
Router.route("/:reviewId")
  .get(verifyToken,validReviewId,validateRequest, getReview)
  .patch(
    verifyToken,
    preventEmptyReq,
    validReviewId,
    updateReviewValidation,
    validateRequest,
    isEnroll,
    updateReview,
  )
  .delete(verifyToken, validReviewId, validateRequest,isEnroll, deleteReview);
module.exports = Router;
