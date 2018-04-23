const Validator = require("validator");
const isEmpty = require("./is-empty");
const isValidType = require("./is-valid-type");

module.exports = function validateSeriesInput(data) {
  let errors = {};

  data.seriesName = !isEmpty(data.seriesName) ? data.seriesName : "";
  data.seriesDesc = !isEmpty(data.seriesDesc) ? data.seriesDesc : "";

  if (!isValidType(data.seriesType)) {
    errors.seriesType = "The series type must be a video, blog, or podcast";
  }

  if (Validator.isEmpty(data.seriesName)) {
    errors.seriesName = "A name for the series is required.";
  }

  if (Validator.isEmpty(data.seriesDesc)) {
    errors.seriesDesc = "A series description is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
