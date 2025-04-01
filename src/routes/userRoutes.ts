import express from "express";
import { createUser } from "../controllers/userController";
import { userSchema } from "../validators/userSchema";

const router = express.Router();

router
  .route("/")
  /**
   * @swagger
   * /api/users/:
   *   post:
   *     summary: Create a new User
   *     tags: [Users]
   *     requestBody:
   *       $ref: '../../schema/users/userSchema.yml#/components/schemas/user/request'
   *     responses:
   *       201:
   *        $ref: '../../schema/users/userSchema.yml#/components/responses/201'
   *       400:
   *        $ref: '../../schema/users/userSchema.yml#/components/responses/400'
   */
  .post(userSchema, createUser);

export default router;
