const mongoose = require("mongoose");
const { Schema } = mongoose;
const validator = require("validator");
const userRoles = require("../utils/userRoles");
const zxcvbn=require("zxcvbn");
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be less than 20 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email",
      },
    },

  password: {
  type: String,
  required: [true, "Password is required"],
  minlength: [10, "Password must be at least 10 characters"],
  validate: {
    validator: function (value) {
      const strength = zxcvbn(value);
      return strength.score >= 2;
    },
    message: "Password is too weak",
  },
  select: false,
},

    phone: {
      type: String,
      validate: {
        validator: (phone) => /^\+[1-9]\d{1,14}$/.test(phone),
        message: "Invalid phone number",
      },
    },
    role: {
      type: String,
      enum: [userRoles.STUDENT, userRoles.INSTRUCTOR, userRoles.ADMIN],
      default: userRoles.STUDENT,
    },
    profileImage: {
      type: String,
      default: "../uploads/profileimage.jpg",
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
