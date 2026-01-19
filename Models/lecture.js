const mongoose = require("mongoose");
const { Schema } = mongoose;
const lectureShema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    courseId: {
      type: Schema.Types.ObjectId,
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
