const { body } = require("express-validator");

const createValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be 3-100 characters"),

  body("courseId")
    .notEmpty()
    .withMessage("Course ID is required")
    .isMongoId()
    .withMessage("Invalid Course ID"),

  body("videoUrl")
    .notEmpty()
    .withMessage("videoUrl is required")
    .isURL()
    .withMessage("Invalid URL"),

  body("freePreview")
    .optional()
    .isBoolean()
    .withMessage("freePreview must be boolean"),

  body("resources")
    .optional()
    .isArray()
    .withMessage("resources must be an array"),

  body("resources.*.filename")
    .optional()
    .isString()
    .withMessage("resource filename must be a string")
    .notEmpty()
    .withMessage("resource filename is required"),

  body("resources.*.fileUrl")
    .optional()
    .isURL()
    .withMessage("resource fileUrl must be a valid URL"),
];
const updateValidation = [

  body("title")
    .trim()
    .optional()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be 3-100 characters"),

  body("courseId")
    .optional()
    .isMongoId()
    .withMessage("Invalid Course ID"),

  body("videoUrl")
    .optional()
    .isURL()
    .withMessage("Invalid URL"),

  body("freePreview")
    .optional()
    .isBoolean()
    .withMessage("freePreview must be boolean"),

  body("resources")
    .optional()
    .isArray()
    .withMessage("resources must be an array"),

  body("resources.*.filename")
    .optional()
    .isString()
    .withMessage("resource filename must be a string")
    .notEmpty()
    .withMessage("resource filename is required"),

  body("resources.*.fileUrl")
    .optional()
    .isURL()
    .withMessage("resource fileUrl must be a valid URL"),
];
module.exports={createValidation,updateValidation}