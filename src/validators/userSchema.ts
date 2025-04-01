import { body } from "express-validator";
import { checkEmail, checkUsername } from "../services/userService";

const userSchema = [
  body("userName")
    .notEmpty()
    .trim()
    .withMessage("User name is required")
    .bail()
    .custom(checkUsername),
  body("firstName").notEmpty().trim().withMessage("First name is required"),
  body("email")
    .notEmpty()
    .trim()
    .withMessage("Email is required")
    .bail()
    // if email is empty, the following will not be run
    .isEmail()
    .withMessage("Email is not valid")
    .bail()
    .custom(checkEmail),
  body("password").notEmpty().trim().withMessage("Password is required"),
];

export { userSchema };
