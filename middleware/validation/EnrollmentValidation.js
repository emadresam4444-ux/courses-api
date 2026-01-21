const { body} = require("express-validator");
const validBody = [
  body("course")
    .notEmpty()
    .withMessage("Course Id required")
    .isMongoId()
    .withMessage("Course Id invalid"),
];
module.exports = validBody;
