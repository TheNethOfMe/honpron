const Validator = require("validator");
const User = require("../models/User");
const isEmpty = require("./is-empty");

module.exports = async function validateMessageInput(data) {
  let errors = {};
  let recipientId;
  const foundRecipient = await User.findOne({ userName: data.recipient });
  data.recipient = !isEmpty(data.recipient) ? data.recipient : "";
  data.body = !isEmpty(data.body) ? data.body : "";

  if (!foundRecipient) {
    errors.recipient = "We can't find a user by that name.";
  } else {
    recipientId = foundRecipient._id;
  }
  if (Validator.isEmpty(data.recipient)) {
    errors.recipient = "Message must have a recipient.";
  }
  if (Validator.isEmpty(data.recipient)) {
    errors.recipient = "Message must have a recipient.";
  }
  if (Validator.isEmpty(data.body)) {
    errors.body = "You must have a message to send.";
  }
  return {
    errors,
    isValid: isEmpty(errors),
    recipientId
  };
};
