const { Schema, default: mongoose } = require("mongoose");
const validator = require("validator");

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
      minlength: [6, "Password must be at least 6 characters"],
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: (value) => {
          /^\d+$/.test(value);
        },
      },
      minlength: [10, "phone must be at least 10 characters"],
      maxlength: [15, "phone must be less than 16 characters"],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
