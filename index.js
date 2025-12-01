require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const AppError = require("./utils/customError");
const errorHandler = require("./middleware/ErrorHandler");
const httpStatusText = require("./utils/httpStatusText");
const app = express();
const PORT = process.env.PORT || 3000;
const URL = process.env.MONGO_URL;
app.use(express.json());
const courseRouter = require("./Routes/Course");
const userRouter = require("./Routes/user");
const authRouter = require("./Routes/auth");
app.use("/course", courseRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use((_req, _res, next) => {
  next(
    new AppError("this resource is not available", 404, httpStatusText.ERROR)
  );
});
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
