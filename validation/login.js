const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.userName = !isEmpty(data.userName) ? data.userName : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.banned = !isEmpty(data.banned) ? data.banned : false;

  if (Validator.isEmpty(data.userName)) {
    errors.userName = "Username is required.";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
