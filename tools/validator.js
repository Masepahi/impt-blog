const validate = require("mongoose-validator");
const validator = {};

validator.isEmail = [
  validate({
    validator: "isEmail",
    message: "Please enter a valid email address",
  }),
];

validator.isLength = [
  validate({
    validator: "isLength",
    arguments: [3, 30],
    message: "The length must between 3 and 30 characters",
  }),
];

validator.isPasswordOk = [
  validate({
    validator: "isLength",
    arguments: [3, 50],
    message: "Name should be between {ARGS[0]} and {ARGS[1]} characters",
  }),
  validate({
    validator: "isAlphanumeric",
    message: "Name should contain alpha-numeric characters only",
  }),
];
module.exports = validator;
