const mongoose = require("mongoose");
const { Schema } = mongoose;

const lectureSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, 
      minlength: 3,
      maxlength: 100,
    },
    course: {
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
      default: 0, 
    },
    freePreview: {
      type: Boolean,
      default: false,
    },
    resources: [{ filename: String, fileUrl: String }],
  },
  { timestamps: true }
);

const lectureModel = mongoose.model("Lecture", lectureSchema);
module.exports = lectureModel;