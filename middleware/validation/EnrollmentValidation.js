const { body, param} = require("express-validator");
const validBody = [
  body("courseId")
    .notEmpty()
    .withMessage("Course Id required")
    .isMongoId()
    .withMessage("Course Id invalid"),
];
module.exports = validBody;
