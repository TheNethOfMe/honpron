const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  recipient: {
    type: String,
    required: true
  },
  recipientId: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: "(no subject)"
  },
  body: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  read: {
    // indicates that the recipient will not see this message flagged as new
    type: Boolean,
    default: false
  },
  authorDelete: {
    // indicates that the sender deleted message and will not appear in inbox
    type: Boolean,
    default: false
  },
  recipientDelete: {
    // indicates that the recipient deleted message (if both delete message, message is removed from db)
    type: Boolean,
    default: false
  }
});

module.exports = Message = mongoose.model("messages", MessageSchema);
