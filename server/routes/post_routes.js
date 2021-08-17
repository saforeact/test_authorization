const express = require("express");
const { Post } = require("../models");
const { chunk } = require("lodash");
const postRouter = express.Router();

const getYear = () => new Date().getFullYear();
const getMonth = () => checkLength(new Date().getMonth() + 1);
const getDay = () => checkLength(new Date().getDate());
const getHours = () => checkLength(new Date().getHours());
const getMinutes = () => checkLength(new Date().getMinutes());
const getSeconds = () => checkLength(new Date().getSeconds());

const checkLength = (value) =>
  String(value).length === 1 ? `0${value}` : value;

const getDateNow = () =>
  `${getHours()}:${getMinutes()}:${getSeconds()} ${getYear()}-${getMonth()}-${getDay()}`;

postRouter.post("/setPost", async (req, res) => {
  const { _id, title, body } = req.body;
  try {
    const post = new Post({
      autorId: _id,
      titlePost: title,
      bodyPost: body,
      publicationTime: getDateNow(),
    });
    const newPost = await post.save();
    const { __v, ...partPost } = newPost._doc;
    return res
      .status(200)
      .json({ message: "Post successfully saved", post: partPost });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});
postRouter.post("/", async (req, res) => {
  const { _id, limit, page } = req.body;
  try {
    const postList = [...(await Post.find({ autorId: _id }))].reverse();
    const total = postList.length;
    const totalPages = Math.ceil(total / limit);

    return res.status(200).json({
      message: "Eat shit, fuck",
      postList: chunk(postList, limit)[page],
      listInformation: { total, totalPages },
    });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = postRouter;
