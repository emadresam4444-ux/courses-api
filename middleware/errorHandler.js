const httpStatusText = require("../utils/httpStatusText");
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Something went wrong";
  const statusText = err.statusText || httpStatusText.ERROR;
  res.status(statusCode).json({ status: statusText, message: msg });
};
module.exports = errorHandler;
