const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const entries = require("./routes/api/entries");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport.js")(passport);

app.use("/api/users", users);
app.use("/api/entries", entries);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Piranhas swimming on port ${port}`));
