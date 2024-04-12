const { body, param } = require("express-validator");

const schoolSchema = [
  body("name").notEmpty().trim().withMessage("School name is required"),
  body("email").notEmpty().trim().withMessage("Email is required"),
  body("email").isEmail().trim().withMessage("Please enter a valid email-id"),
];

const emailCheckValidator = [
  param("email").notEmpty().trim().withMessage("Email is required"),
  param("email").isEmail().trim().withMessage("Email is not valid"),
];

module.exports = {
  schoolSchema,
  emailCheckValidator,
};
