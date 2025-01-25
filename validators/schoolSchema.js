const { body, param } = require("express-validator");
const {
  checkEmailExists,
  checkPhoneNumberExists,
} = require("../services/schoolService");

const schoolSchema = [
  body("name").notEmpty().trim().withMessage("School name is required"),
  body("password").notEmpty().trim().withMessage("Password is required"),
  body("confirm_password")
    .notEmpty()
    .trim()
    .withMessage("Confirm password is required")
    .bail()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords are not matched"),
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email-id")
    .bail()
    .custom(async (email) => {
      const isEmailExists = await checkEmailExists(email);

      if (isEmailExists) {
        throw new Error("Email already exists");
      } else {
        return true;
      }
    }),
  body("phone_number")
    .notEmpty()
    .trim()
    .withMessage("Phone number is required")
    .bail()
    .custom(async (phone_number) => {
      if (await checkPhoneNumberExists(phone_number)) {
        throw new Error("Phone number already exists");
      } else {
        true;
      }
    }),
];

const schoolUpdateSchema = [
  body("name").notEmpty().trim().withMessage("School name is required"),
  body("is_logo_changed").notEmpty().withMessage("isLogoChaned is required"),
  body("confirm_password")
    .custom((value, { req }) => {
      if (req.body.password) {
        return value.trim() === req.body.password.trim();
      } else {
        return true;
      }
    })
    .withMessage("Passwords are not matched"),
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Please enter a valid email-id")
    .bail()
    .custom(async (email, { req }) => {
      const isEmailExists = await checkEmailExists(
        email,
        req?.params?.schoolId
      );

      if (isEmailExists) {
        throw new Error("Email already exists");
      } else {
        return true;
      }
    }),
  body("phone_number")
    .notEmpty()
    .trim()
    .withMessage("Phone number is required")
    .bail()
    .custom(async (phone_number, { req }) => {
      if (await checkPhoneNumberExists(phone_number, req?.params?.schoolId)) {
        throw new Error("Phone number already exists");
      } else {
        true;
      }
    }),
];

const emailCheckValidator = [
  param("email")
    .notEmpty()
    .trim()
    .withMessage("Email is required")
    .bail()
    .isEmail()
    .withMessage("Email is not valid"),
];

module.exports = {
  schoolSchema,
  emailCheckValidator,
  schoolUpdateSchema,
};
