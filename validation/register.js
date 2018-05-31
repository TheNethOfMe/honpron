const Validator = require("validator");
const User = require("../models/User");
const isEmpty = require("./is-empty");
const getCommentCode = require("./comment-coding");
const isReserved = require("./reserved-usernames");

module.exports = async function validateRegisterInput(data, regularUser) {
  let errors = {};
  const emailTaken = await User.findOne({ email: data.email });
  const usernameTaken = await User.findOne({ userName: data.userName });
  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.userName, { min: 4, max: 30 })) {
    errors.userName = "Username must be between 4 and 30 characters";
  }
  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username is required.";
  }
  if (usernameTaken) errors.userName = "That username has been taken.";

  if (getCommentCode(data.userName) !== "blue") {
    errors.userName = "Please choose another username.";
  }

  if (!!data.userName.match(/\W/)) {
    errors.userName =
      "Usernames can only contain letters, numbers, and underscores.";
  }

  if (regularUser && isReserved(data.userName)) {
    errors.userName = "Please choose another username.";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid.";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required.";
  }
  if (emailTaken) errors.email = "That email is already registered.";

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match.";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Password confirm is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
