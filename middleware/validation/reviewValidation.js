const { body, param } = require("express-validator");

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
    .notEmpty()
    .withMessage("Comment is required")
    .isLength({ min: 10, max: 500 })
    .withMessage("Comment must be between 10 and 500 characters"),
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
    .isLength({ min: 10, max: 500 })
    .withMessage("Comment must be between 10 and 500 characters"),
];

const validReviewId = [
  param("reviewId")
    .notEmpty()
    .withMessage("Review ID is required")
    .isMongoId()
    .withMessage("Invalid Review ID"),
];

module.exports = {
  createReviewValidation,
  updateReviewValidation,
  validReviewId,
};