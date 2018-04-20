const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  blogContent: {
    type: String,
    required: true
  }
});

module.exports = Blog = mongoose.model("blogs", BlogSchema);
