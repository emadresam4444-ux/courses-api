const mongoose = require("mongoose");
const lectureShema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      defult: 0,
    },
    freePreview: {
      type: Boolean,
      default: false,
    },
    resources: [{ filename: String, fileUrl: String }],
  },
  { timestamps: true }
);

lectureModel = mongoose.model("lecture", lectureShema);
module.exports = lectureModel;
