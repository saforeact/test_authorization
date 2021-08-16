const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");

const authRouter = express.Router();

authRouter.post("/signIn", async (req, res) => {
  const { login, password } = req.body;
  const user = await User.findOne({ email: login });

  if (!user) {
    return res.status(400).json({ message: "This user is not found." });
  }
  const passwordCheck = await bcrypt.compare(password, user.password);

  if (!passwordCheck) {
    return res.status(400).json({ message: "wrong password or name" });
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SERCET_KEY, {
    expiresIn: "10m",
  });
  return res.status(200).json({ token });
});

authRouter.post("/signUp", async (req, res) => {
  const { login, password } = req.body;

  const candidate = await User.findOne({ email: login });
  if (!candidate) {
    const hashPassword = await bcrypt.hash(password, +process.env.SALT_ROUNDS);
    const user = new User({
      email: login,
      password: hashPassword,
      isActive: false,
    });
    await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SERCET_KEY, {
      expiresIn: "10m",
    });
    return res
      .status(200)
      .json({ message: "The user has successfully registered", token });
  } else {
    return res.status(401).json({ message: "The user is already registered" });
  }
});

module.exports = authRouter;
