const Validator = require("validator");
const Series = require("../models/Series");
const isEmpty = require("./is-empty");

module.exports = async function validateEntryInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.series = !isEmpty(data.series) ? data.series : "";
  data.youtubeId = !isEmpty(data.youtubeId) ? data.youtubeId : "";
  data.duration = !isEmpty(data.duration) ? data.duration : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "A title is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "A description is required";
  }

  if (
    data.entryType !== "video" &&
    data.entryType !== "podcast" &&
    data.entryType !== "blog"
  ) {
    errors.entryType = "The series type must be a video, blog, or podcast";
  }

  let found = await Series.findOne({ seriesName: data.series });
  if (!found) errors.series = "That series does not exist.";

  if (Validator.isEmpty(data.series)) {
    errors.series = "Series is required";
  }
  if (Validator.isEmpty(data.youtubeId) && data.entryType === "video") {
    errors.youtubeId = "Videos must have a YouTube ID.";
  }
  if (Validator.isEmpty(data.duration) && data.entryType !== "blog") {
    errors.duration = "Videos and podcasts must have a duration.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
