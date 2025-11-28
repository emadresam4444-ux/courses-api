const { validationResult, param, body } = require("express-validator");
const AppError = require("../utils/customError");
const { ERROR } = require("../utils/httpStatusText");
const httpStatusText = require("../utils/httpStatusText");
const validateRequest = (req, _res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new AppError(err.array()[0].msg, 400, httpStatusText.FAIL));
  }
  next();
};
const validcourseId = [
  param("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid Course ID"),
];
const createValidation = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be 3-100 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),
  body("instructor")
    .notEmpty()
    .withMessage("Instructor is required")
    .isLength({ min: 3 })
    .withMessage("Instructor name must be at least 3 characters"),
  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),
  body("isPublished")
    .optional()
    .isBoolean()
    .withMessage("isPublished must be true or false"),
];
module.exports = { validateRequest, validcourseId, createValidation };
