const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EntrySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  dateAdded: {
    type: Date,
    default: Date.now
  },
  entryType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  series: {
    type: String,
    required: true
  },
  youtubeId: {
    // video only
    type: String
  },
  games: {
    type: [String]
  },
  duration: {
    // podcast and video only
    type: String
  },
  blog: {
    // blog only
    type: Schema.Types.ObjectId,
    ref: "blog"
  }
});

module.exports = Entry = mongoose.model("entries", EntrySchema);
