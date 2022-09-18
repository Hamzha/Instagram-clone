const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
var cors = require("cors");

const { MONGOURI, MONGOURI2 } = require("./keys");

require("./models/user");
require("./models/post");

app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

// mongoose.model("User");
mongoose.connect(MONGOURI2);

mongoose.connection.on("connected", () => {
  console.log("mongoose is connected");
});

mongoose.connection.on("error", (error) => {
  console.log("mongoose is not connected", error);
});

app.listen(PORT, () => {
  console.log("Console is running or port" + PORT);
});

// 1vGiQjleYSzJY7fh
