const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth_routes");
const userRouter = require("./routes/users_routes");
const jwt = require("jsonwebtoken");
const postRouter = require("./routes/post_routes");

const app = express();

const conectToDataBase = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log(`db`, db.connection.host);
  } catch (error) {
    console.log(`errorConnect`, error);
  }
};

conectToDataBase();

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SERCET_KEY);
    req.body._id = decoded._id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Token expired" });
  }
};

const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/user", checkToken, userRouter);
app.use("/post", checkToken, postRouter);

app.listen(port, () => {
  console.log("We are live on " + port);
});
