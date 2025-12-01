const userModel = require("../Models/user");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");
const bcrypt = require("bcryptjs");

const getUsers = asyncWrapper(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;
  const page = parseInt(req.query.page) || 1;
  const skip = (page - 1) * limit;
  const users = await userModel
    .find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  if (users.length === 0) {
    return next(new AppError("Users not found", 400, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { users } });
});
const getUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await userModel.findById(userId);
  if (!user) {
    return next(new AppError("User not found", 400, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
});
const addUser = asyncWrapper(async (req, res, next) => {
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
const updateUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    {
      $set: { ...req.body },
    },
    { new: true }
  );
  if (!updatedUser) {
    return next(new AppError("User not found", 400, httpStatusText.FAIL));
  }
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { updatedUser } });
});
const deleteUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const deletedUser = await userModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    return next(new AppError("User not found", 400, httpStatusText.FAIL));
  }
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, message: "Deleted user success" });
});
module.exports = { getUser, getUsers, addUser, updateUser, deleteUser };
