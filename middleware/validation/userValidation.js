const { body, param} = require("express-validator");
const AppError = require("../../utils/customError");
const httpStatusText = require("../../utils/httpStatusText");
const userRoles = require("../../utils/userRoles");
const zxcvbn = require("zxcvbn");

const validuserid = [
  param("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isMongoId()
    .withMessage("Invalid User ID"),
];
const validRole = (req, _res, next) => {
  const { role } = req.body;
  const validRoles = Object.values(userRoles);
  if (!validRoles.includes(role)) {
    return next(new AppError("Invalid Role", 400, httpStatusText.FAIL));
  }
  next();
};
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
  body("phone")
    .optional()
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
const validateStrongPassword = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
    return next(new AppError("Password is required", 400, httpStatusText.FAIL));
  }
  if (password.length < 10) {
    return next(
      new AppError(
        "Password must be at least 10 characters",
        400,
        httpStatusText.FAIL,
      ),
    );
  }
  const strength = zxcvbn(password);
  if (strength.score <= 2) {
    return next(
      new AppError(
        "Password is too weak, try adding symbols, numbers, and uppercase letters",
        400,
        httpStatusText.FAIL,
      ),
    );
  }

  next();
};
module.exports = {
  validuserid,
  createValidation,
  updateValidation,
  validRole,
  validateStrongPassword,
};
