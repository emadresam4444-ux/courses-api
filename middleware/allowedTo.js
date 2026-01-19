const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");
const allowedTo = (...roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) {
      return next();
    } else {
      next(
        new AppError(
          `Role ${req.user.role} is not allowed to access this`,
          403,
          httpStatusText.ERROR,
        ),
      );
    }
  };
};
module.exports = allowedTo;
