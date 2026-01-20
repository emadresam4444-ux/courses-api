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
} = require("../middleware/validation/reviewValidation");
Router.route("/")
  .get(verifyToken, getReviews)
  .post(
    verifyToken,
    preventEmptyReq,
    createReviewValidation,
    validateRequest,
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
    updateReview,
  )
  .delete(verifyToken, validReviewId, validateRequest, deleteReview);
module.exports = Router;
