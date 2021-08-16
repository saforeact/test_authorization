const mongoose = require("mongoose");
const { userSchema, postSchema } = require("../schemas");
module.exports = {
  User: mongoose.model("User", userSchema),
  Post: mongoose.model("Post", postSchema),
};
