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
  description: {
    type: String,
    required: true
  },
  series: {
    type: Schema.Types.ObjectId,
    ref: "series"
  },
  youtubeId: {
    // video only
    type: String
  },
  games: {
    type: [String]
  },
  length: {
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
