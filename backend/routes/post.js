const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewere/requireLogin");
const Post = mongoose.model("Post");

router.post("/createpost", requireLogin, (req, res) => {
  const { title, body, url } = req.body;
  if (!title || !body || !url) {
    return res.status(422).json({ error: "Please add all the fields." });
  } else {
    req.user.password = undefined;
    const post = new Post({
      title,
      body,
      photo: url,
      postedBy: req.user,
    });
    post
      .save()
      .then((savedPost) => {
        res.status(200).json({ message: savedPost });
      })
      .catch((err) => console.log(err));
  }
});

router.post("/allpost", requireLogin, (req, res) => {
  Post.find()
    .populate("postedBy", "_id name")
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/mypost", requireLogin, (req, res) => {
  Post.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then((posts) => {
      return res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
