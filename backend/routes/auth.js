const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const User = mongoose.model("User");
const JWT = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");

router.post("/signup", (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({ message: "Please add all parameters" });
  }

  User.findOne({ email: email })
    .then((savedUser) => {
      if (savedUser)
        return res
          .status(422)
          .json({ message: "User already exists with that email." });
      else
        bycrypt
          .hash(password, 12)
          .then((hashPassword) => {
            const user = new User({
              email,
              password: hashPassword,
              name,
              pic
            });
            user
              .save()
              .then((user) => {
                return res.status(200).json({ message: "user is saved!" });
              })
              .catch((err) => {
                return res.status(400).json({ message: err });
              });
          })
          .catch((err) => {
            console.log(err);
          });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ message: "Please provide email or password." });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (!savedUser) {
          return res
            .status(422)
            .json({ message: "Invalid email or password." });
        }
        bycrypt.compare(password, savedUser.password).then((doMatch) => {
          if (doMatch) {
            const token = JWT.sign({ _id: savedUser._id }, JWT_SECRET);
            const { _id, name, email, pic, followers, following } = savedUser;
            res.status(200).json({ token, user: { _id, name, email, followers, following, pic } });
          } else
            res.status(422).json({ message: "Invalid email or password." });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
