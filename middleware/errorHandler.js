const httpStatusText = require("../utils/httpStatusText");
const errorHandler = (err, req, res,next) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Something went wrong"; 
  const statusText = (statusCode >= 400 && statusCode < 500) 
        ? httpStatusText.FAIL 
        : httpStatusText.ERROR;
  res.status(statusCode).json({ status: statusText, message: msg });
  next();
};
module.exports = errorHandler;
