const httpStatusText = require("../utils/httpStatusText");
const errorHandler = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || 500;
  const msg = err.message || "Something went wrong";
  res.status(statusCode).json({ status: httpStatusText.ERROR, message: msg });
};
module.exports = errorHandler;