const mongoose = require("mongoose");
const { Schema } = mongoose;
const CourseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "No description provided",
    },
    isPublished: {
      type: Boolean,
      required: true,
      default: false,
    },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  },
);
const courseModel = mongoose.model("Course", CourseSchema);
module.exports = courseModel;
