const { body, param, validationResult } = require("express-validator");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");
const validateRequest = (req, _res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new AppError(err.array()[0].msg, 400, httpStatusText.FAIL));
  }
  next();
};

const validuserid = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID"),
];

const createValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3, max: 15 })
    .withMessage("username must be 3-15 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .isString()
    .withMessage("Email must be string"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isStrongPassword()
    .withMessage("This is Weak password")
    .isLength({ min: 8, max: 30 }),
  body("phone")
    .notEmpty()
    .withMessage("phone is required")
    .isNumeric()
    .withMessage("Invalid phone number")
    .isMobilePhone("any")
    .withMessage("Invalid phone number")
    .isLength({ min: 10, max: 15 })
    .withMessage("username must be 10-16 number"),
];
const updateValidation = [
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3, max: 15 })
    .withMessage("username must be 3-15 characters"),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid Email")
    .isString()
    .withMessage("Email must be string"),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("password is required")
    .isStrongPassword()
    .withMessage("This is Weak password")
    .isLength({ min: 8, max: 30 }),
  body("phone")
    .optional()
    .notEmpty()
    .withMessage("phone is required")
    .isNumeric()
    .withMessage("Invalid phone number")
    .isMobilePhone("any")
    .withMessage("Invalid phone number")
    .isLength({ min: 10, max: 15 })
    .withMessage("username must be 10-16 number"),
];

module.exports = {
  validateRequest,
  validuserid,
  createValidation,
  updateValidation,
};
