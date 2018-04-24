const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: Boolean,
  blackListed: Boolean,
  banned: Boolean
});

module.exports = User = mongoose.model("users", UserSchema);
