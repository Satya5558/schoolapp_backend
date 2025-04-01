import { body } from "express-validator";

const studentSchemaValidator = [
  body("firstName").notEmpty().trim().withMessage("FirstName is required"),
  body("lastName").notEmpty().trim().withMessage("LastName is required"),
  body("gender")
    .exists()
    .notEmpty()
    .withMessage("Gender is Required")
    .notEmpty()
    .trim()
    .isIn(["Male", "Female"])
    .withMessage("Gender does not contain valid value"),
  body("dateOfBirth")
    .exists()
    .isDate()
    .withMessage("Date of birth is required"),
  body("phoneNumber")
    .exists()
    .notEmpty()
    .trim()
    .withMessage("Phone number is required"),
  body("enrollmentDate")
    .exists()
    .isDate()
    .withMessage("EnrollmentDate is required"),
];

export { studentSchemaValidator };
