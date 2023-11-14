const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

const authRouter = require("./auth/auth");
const userRouter = require("./routes/user");
const blogsRouter = require("./routes/blog");
const reportBlogRouter = require("./routes/reportblog");

// JSOn file compresion
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
  })
);

app.use(cors());
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use("/api/v1/reportblog", reportBlogRouter);

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    res.status(400).json({ error: "Bad request - request entity too large" });
  } else {
    next();
  }
});

mongoose
  .connect(
    "mongodb+srv://alokdake2003:M2Ky1CQ9L0fDiBei@cluster0.daojco1.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(1818, () => {
  console.log("Server is running");
});
