const { error } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const AppError = require("./utils/customError");
const errorHandler = require("./middleware/ErrorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;
app.use(express.json());
const CourseRouter = require("./Routes/Course");
app.use("/course", CourseRouter);
app.use(errorHandler);
mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is Running on Port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
