const { text } = require("express");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewere/requireLogin");
const Post = mongoose.model("Post");

const User = mongoose.model("User");

router.get("/user/:userId", requireLogin, (req, res) => {
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


router.put("/follow", requireLogin, (req, res) => {
  try {
    User.findByIdAndUpdate(
      { _id: req.body.followId },
      {
        $push: { followers: req.user._id },
      },
      { new: true },
      function (err, model) {
        if (!err) {
          User.findByIdAndUpdate(
            { _id: req.user._id },
            {
              $push: { following: req.body.followId },
            },
            { new: true },
            function (err, model1) {
              if (!err) res.json(model1)
              else res.status(422).json({ error: err });
            }
          ).select('-password')

        }
        else res.status(422).json({ error: err });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

router.put("/unfollow", requireLogin, (req, res) => {
  try {
    User.findByIdAndUpdate(
      { _id: req.body.followId },
      {
        $pull: { followers: req.user._id },
      },
      { new: true },
      function (err, model) {
        if (!err) {
          User.findByIdAndUpdate(
            { _id: req.user._id },
            {
              $pull: { following: req.body.followId },
            },
            { new: true },
            function (err, model1) {
              if (!err) res.json(model1)
              else res.status(422).json({ error: err });
            }
          ).select('-password')
        }
        else res.status(422).json({ error: err });
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
