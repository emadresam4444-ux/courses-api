const userModel = require("../Models/user");
const asyncWrapper = require("../middleware/asyncWrapper");
const AppError = require("../utils/customError");
const httpStatusText = require("../utils/httpStatusText");
const getUsers = asyncWrapper(async (req, res, next) => {
  const users = await userModel.find();
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
  const user = await userModel.create({
    username,
    email,
    password,
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
