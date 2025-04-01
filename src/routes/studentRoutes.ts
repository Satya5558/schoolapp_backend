import express from "express";
import {
  createStudentAction,
  getStudentsAction,
} from "../controllers/studentController";
import { studentSchemaValidator } from "../validators/studentSchemaValidator";

const router = express.Router();

router
  .route("/")
  /**
   * @swagger
   * /api/students:
   *   get:
   *     summary: Get all students
   *     tags: [Students]
   *     description: Retrieve a list of students
   *     responses:
   *       200:
   *         description: Successfully retrieved students
   *       500:
   *         description: Internal Server Error
   */
  .get(getStudentsAction)
  /**
   * @swagger
   * /api/students:
   *  post:
   *    summary: Create Student
   *    tags: [Students]
   *    requestBody:
   *      content:
   *        application/json: # Media type
   *          schema: # Request payload
   *            type: object
   *            properties: # Request parts
   *              firstName: # Part 1 (string value)
   *                type: string
   *                required: true
   *              lastName:
   *                type: string
   *                required: true
   *              gender:
   *                type: string
   *                required: true
   *              dateOfBirth:
   *                type: string
   *                format: date
   *                required: true
   *              email:
   *                type: string
   *              phoneNumber:
   *                type: string
   *              enrollmentDate:
   *                type: string
   *                format: date
   *              enrollmentStatus:
   *                type: string
   *    responses:
   *     201:
   *      description: Student created
   *      content:
   *        application/json:
   *          example:
   *            data: [{}]
   *     400:
   *       description: Validation occured
   */
  .post(studentSchemaValidator, createStudentAction);

export default router;
