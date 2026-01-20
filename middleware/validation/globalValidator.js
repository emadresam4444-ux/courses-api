const {validationResult}=require('express-validator')
const AppError = require("../../utils/customError");
const httpStatusText = require("../../utils/httpStatusText");
const validateRequest = (req, _res, next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return next(new AppError(err.array()[0].msg, 400, httpStatusText.FAIL));
  }
  next();
};
const preventEmptyReq = (req, res, next) => {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({
      message: "At least one field is required to update"
    });
  }
  next();
};
module.exports={validateRequest,preventEmptyReq};