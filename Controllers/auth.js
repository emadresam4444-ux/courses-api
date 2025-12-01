const userModel = require("../Models/user");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");

const register = asyncWrapper(async (req, res, next) => {
  const { username, email, password, phone } = req.body;
  const userExist = await userModel.findOne({
    $or: [{ username }, { email }, { phone }],
  });
  if (userExist) {
    return next(new AppError("User already exist", 400, httpStatusText.FAIL));
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    phone,
  });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
});
const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new AppError("Email or Password not valid", 400, httpStatusText.FAIL)
    );
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new AppError("User not exist", 400, httpStatusText.FAIL));
  }
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    return next(
      new AppError("Email or Password not valid", 400, httpStatusText.FAIL)
    );
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
});
module.exports = { register, login };
