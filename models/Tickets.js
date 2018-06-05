const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  sender: {
    type: String,
    required: true
  },
  senderId: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: "(No Subject)"
  },
  topic: String,
  ticketText: {
    type: String,
    required: true
  },
  colorCode: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  responseText: String,
  closed: {
    type: Boolean,
    default: false
  }
});

module.exports = Ticket = mongoose.model("tickets", TicketSchema);
