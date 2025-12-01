const httpStatusText = require("../utils/httpStatusText");
const AppError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  try {
    if (!authHeader) {
      return next(new AppError("Token is required", 401, httpStatusText.ERROR));
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(
        new AppError("Token is malformed", 401, httpStatusText.ERROR)
      );
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return next(
      new AppError(
        error.message || "Invalid or expired token",
        401,
        httpStatusText.ERROR
      )
    );
  }
};
module.exports = verifyToken;
