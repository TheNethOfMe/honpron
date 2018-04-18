const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const entries = require("./routes/api/entries");

const app = express();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.use("/api/users", users);
app.use("/api/admin", admin);
app.use("/api/entries", entries);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Piranhas swimming on port ${port}`));
