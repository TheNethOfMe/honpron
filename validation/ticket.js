const Validator = require("validator");
const User = require("../models/User");
const isEmpty = require("./is-empty");

module.exports = async function validateTicketInput(data) {
  let errors = {};
  const foundUser = await User.findById(data.recipientId);
  data.body = !isEmpty(data.body) ? data.body : "";

  if (!foundUser) {
    errors.recipient = "User not found";
  }
  if (Validator.isEmpty(data.body)) {
    errors.body = "A message is required to send back.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
