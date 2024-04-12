const express = require("express");

const {
  createSchool,
  getSchools,
  checkEmail,
} = require("../controllers/schoolController");

const {
  schoolSchema,
  emailCheckValidator,
} = require("../validators/schoolSchema");

const route = express.Router();

route.route("/schools").get(getSchools).post(schoolSchema, createSchool);

route.route("/schools/check-email/:email").get(emailCheckValidator, checkEmail);

module.exports = route;
