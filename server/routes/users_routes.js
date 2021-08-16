const express = require("express");
const { User } = require("../models");

const userRouter = express.Router();

userRouter.post("/editProfile", async (req, res) => {
  const { form, _id } = req.body;
  try {
    await User.findOneAndUpdate({ _id: _id }, { ...form, isActive: true });
    return res.status(200).json({ message: "Changes applied" });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

userRouter.post("/data", async (req, res) => {
  const { _id } = req.body;
  const user = await User.findOne({ _id });
  const { password, __v, ...resUser } = user._doc;
  res.status(200).json({ user: resUser });
});

module.exports = userRouter;
