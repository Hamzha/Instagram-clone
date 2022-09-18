const { text } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewere/requireLogin");
const Post = mongoose.model("Post");

const User = mongoose.model("User");

router.get("/user/:userId", (req, res) => {
  User.findById({ _id: req.params.userId })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.userId })
        .populate("postedBy", "_by name")
        .exec((err, posts) => {
          if (!err) {
            return res.json({ user, posts });
          } else {
            return res.status(422).json({ error: err });
          }
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found!" });
    });
});

module.exports = router;
