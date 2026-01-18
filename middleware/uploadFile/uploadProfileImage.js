const path = require("path");
const AppError = require("../../utils/customError");
const httpStatusText = require("../../utils/httpStatusText");

const multer = require("multer");
const { storage } = require("../../config/cloudinary");
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType !== "image") {
    return cb(
      new AppError("File must be a image", 400, httpStatusText.FAIL),
      false,
    );
  }
  cb(null, true);
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});
module.exports = upload;
