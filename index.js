require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongooseDB = require("./config/db");
const AppError = require("./utils/customError");
const errorHandler = require("./middleware/errorHandler");
const httpStatusText = require("./utils/httpStatusText");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
const courseRouter = require("./Routes/Course");
const userRouter = require("./Routes/user");
const authRouter = require("./Routes/auth");
const lectureRouter = require("./Routes/lecture");
const enrollment=require('./Routes/enrollment');
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/course", courseRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/lecture", lectureRouter);
app.use("/enrollment", enrollment);
app.use((_req, _res, next) => {
  next(
    new AppError("this resource is not available", 404, httpStatusText.ERROR),
  );
});
app.use(errorHandler);
mongooseDB()
app.listen(PORT, () => {
      console.log(`Server is Running on Port ${PORT}`);
    });