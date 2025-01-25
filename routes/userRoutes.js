const express = require("express");
const appRoot = require("app-root-path");
const router = express.Router();

const { createUser } = require("../controllers/userController");

const { userSchema } = require(`${appRoot}/validators/userSchema`);

router
  .route("/")
  /**
   * @swagger
   * /api/users/:
   *   post:
   *     summary: Create a new User
   *     tags: [Users]
   *     requestBody:
   *       $ref: '../schema/users/userSchema.yml#/components/schemas/user/request'
   *     responses:
   *       201:
   *        $ref: '../schema/users/userSchema.yml#/components/responses/201'
   *       400:
   *        $ref: '../schema/users/userSchema.yml#/components/responses/400'
   */
  .post(userSchema, createUser);

module.exports = router;
