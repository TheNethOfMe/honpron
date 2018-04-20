const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SeriesSchema = new Schema({
  entryType: {
    type: String,
    required: true
  },
  seriesName: {
    type: String,
    required: true
  }
});

module.exports = Series = mongoose.model("series", SeriesSchema);
