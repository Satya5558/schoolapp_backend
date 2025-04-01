import express from "express";

import {
  checkEmail,
  createSchoolAction,
  editSchoolAction,
  getSchoolAction,
  getSchoolsAction,
  testMethod,
} from "../controllers/schoolController";

import {
  emailCheckValidator,
  schoolSchema,
  schoolUpdateSchema,
} from "../validators/schoolSchema";

import { check } from "express-validator";
import upload from "../middlewares/multerMiddleware";

const route = express.Router();

//protecting routes
//app.use(jwtAuth);
//Test method
route.route("/test-method").get(testMethod);

route
  .route("/")
  /**
   * @swagger
   * /api/schools:
   *  get:
   *    summary: Get Schools
   *    parameters:
   *      - name: school_id
   *        in: query
   *        description: Filter by School ID
   *        schema:
   *          type: String
   *      - name: name
   *        in: query
   *        description: Name
   *        schema:
   *          type: String
   *      - name: email
   *        in: query
   *        description: Email
   *        schema:
   *          type: String
   *      - name: phone_number
   *        in: query
   *        description: Phone Number
   *        schema:
   *          type: String
   *      - name: numRecords
   *        in: query
   *        description: Number of records
   *        schema:
   *          type: Number
   *      - name: pageNum
   *        in: query
   *        description: Page Number
   *        schema:
   *          type: Number
   *    tags: [Schools]
   *    responses:
   *     200:
   *      description: List of Schools
   *      content:
   *        application/json:
   *          example:
   *            data: [{}]
   *     400:
   *       description: Invalid request
   */
  .get(getSchoolsAction)
  /**
   * @swagger
   * /api/schools:
   *  post:
   *    summary: Create School
   *    tags: [Schools]
   *    requestBody:
   *      content:
   *        multipart/form-data: # Media type
   *          schema: # Request payload
   *            type: object
   *            properties: # Request parts
   *              email: # Part 1 (string value)
   *                type: string
   *                required: true
   *              name:
   *                type: string
   *                required: true
   *              password:
   *                type: string
   *                required: true
   *              confirm_password:
   *                type: string
   *                required: true
   *              phone_number:
   *                type: string
   *              address:
   *                type: string
   *              city:
   *                type: string
   *              state:
   *                type: string
   *              country:
   *                type: string
   *              postal_code:
   *                type: string
   *              website:
   *                type: string
   *              logo:
   *                type: string
   *                format: binary
   *    responses:
   *     201:
   *      description: School created
   *      content:
   *        application/json:
   *          example:
   *            data: [{}]
   *     400:
   *       description: Validation occured
   */
  .post(
    upload.single("logo"),
    schoolSchema,
    check("logo")
      .custom((value, { req: { file } }) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
          return true; // return "non-falsy" value to indicate valid data"
        } else {
          return false; // return "falsy" value to indicate invalid data
        }
      })
      .withMessage("Please upload only image files."),
    createSchoolAction
  );

route
  .route("/:schoolId")
  /**
   * @swagger
   * /api/schools/{schoolId}:
   *  get:
   *    summary: Get School
   *    tags: [Schools]
   *    parameters:
   *       - in: path
   *         name: schoolId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the school to retrieve
   *    responses:
   *       200:
   *         description: School details found
   *         content:
   *           application/json:
   *             example:
   *               data: [{}]
   *       404:
   *         description: School details not found
   */
  .get(getSchoolAction)
  .put(upload.single("logo"), schoolUpdateSchema, editSchoolAction);

route.route("/check-email/:email").get(emailCheckValidator, checkEmail);

export default route;
