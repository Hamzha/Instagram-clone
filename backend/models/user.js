const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    default: 'https://res.cloudinary.com/roshnihomes/image/upload/v1663921708/insta-clone/2048px-Emblem-person-blue.svg_xk9498.png'
  },
  followers: [{ type: ObjectId, ref: 'User' }],
  following: [{ type: ObjectId, ref: 'User' }],
});
mongoose.model("User", userSchema);
