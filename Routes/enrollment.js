const Router = require("express").Router();
const { enrollment, getEnrollment } = require("../Controllers/enrollment");

const validBody = require("../middleware/validation/EnrollmentValidation");
const preventEmptyReq = require("../middleware/validation/preventEmptyReq");
const validateRequest = require("../middleware/validation/validateRequest");
const verifyToken = require("../middleware/verifyToken");
Router.route("/")
  .post(verifyToken, preventEmptyReq, validBody, validateRequest, enrollment)
  .get(verifyToken, getEnrollment);

module.exports = Router;
