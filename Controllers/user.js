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
    return next(new AppError("User not found", 404, httpStatusText.FAIL));
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
});
const addUser = asyncWrapper(async (req, res, next) => {
  const { username, email, password, phone, role } = req.body;
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
    role,
  });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { user } });
});
const updateUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const { username, email, phone } = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    {
      $set: { username, email, phone },
    },
    { new: true },
  );
  if (!updatedUser) {
    return next(new AppError("User not found", 404, httpStatusText.FAIL));
  }
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { updatedUser } });
});
const deleteUser = asyncWrapper(async (req, res, next) => {
  const userId = req.params.userId;
  const deletedUser = await userModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    return next(new AppError("User not found", 404, httpStatusText.FAIL));
  }
  res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, message: "Deleted user success" });
});
const changeUserRole = asyncWrapper(async (req, res, next) => {
  const { userId } = req.params;
  const { role } = req.body;
  const updateUser = await userModel.findOneAndUpdate(
    { _id: userId, role: { $ne: role } },
    { role },
    { new: true, runValidators: true },
  );
  if (!updateUser) {
    return next(
      new AppError("User or Role invalid ", 404, httpStatusText.FAIL),
    );
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: updateUser });
});
const uploadProfileImage = asyncWrapper(async (req, res, next) => {
  const userId = req.user.id;
  const profileImageReq = req.file.path;

  if (!profileImageReq) {
    return next(new AppError("No image uploaded", 400, httpStatusText.FAIL));
  }

  await userModel.findByIdAndUpdate(userId, {
    $set: { profileImage: profileImageReq },
  });

  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: profileImageReq,
  });
});

module.exports = {
  getUser,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
  changeUserRole,
  uploadProfileImage,
};
