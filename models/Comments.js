const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  entry: {
    type: String,
    required: true
  },
  entryId: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  commentDate: {
    type: Date,
    default: Date.now
  },
  commentCode: {
    type: String,
    required: true
  },
  approved: {
    type: Boolean,
    required: true
  }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);
