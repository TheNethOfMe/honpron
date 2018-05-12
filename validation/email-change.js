const Validator = require("validator");
const User = require("../models/User");
const isEmpty = require("./is-empty");

module.exports = async function emailChange(data, userName) {
  let errors = {};
  const emailTaken = await User.findOne({ email: data.email });
  const userOldEmail = await User.findOne({ userName });
  data.email = !isEmpty(data.email) ? data.email : "";
  data.email2 = !isEmpty(data.email2) ? data.email2 : "";
  data.oldEmail = !isEmpty(data.oldEmail) ? data.oldEmail : "";

  if (userOldEmail.email !== data.oldEmail) {
    errors.oldEmail = "Old email couldn't be verified.";
  }
  if (Validator.isEmpty(data.oldEmail)) {
    errors.oldEmail = "Old email must be verified.";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (emailTaken) errors.email = "That email is already registered.";
  if (data.email !== data.email2) {
    errors.email2 = "New email and verify email must match.";
  }
  if (Validator.isEmpty(data.email2)) {
    errors.email2 = "Verify new email is required..";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
