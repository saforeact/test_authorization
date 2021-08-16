const mongoose = require("mongoose");
module.exports = {
  userSchema: new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isActive: Boolean,
    name: String,
    surname: String,
    date: String,
    sex: String,
  }),
  postSchema: new mongoose.Schema({
    autorId: { type: mongoose.Types.ObjectId, ref: "User" },
    titlePost: { type: String, required: true },
    bodyPost: { type: String, required: true },
    publicationTime: { type: String, required: true },
  }),
};
