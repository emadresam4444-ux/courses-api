//problem-->can add many image without register
const path = require("path");
const AppError = require("../../utils/customError");
const httpStatusText = require("../../utils/httpStatusText");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const originalname = path.parse(file.originalname).name;
    const filename = `${originalname}_${Date.now()}.${ext}`;
    cb(null, filename);
  },
});
const fileFilter = (req, file, cb) => {
  const fileType = file.mimetype.split("/")[0];
  if (fileType !== "image") {
    return cb(
      new AppError("File must be a image", 400, httpStatusText.FAIL),
      false
    );
  }
  cb(null, true);
};
const upload = multer({ storage, fileFilter });
module.exports = upload;
