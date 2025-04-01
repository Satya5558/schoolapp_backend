import express from "express";
//const passport = require("passport");
const router = express.Router();

import { login, schoolLogin } from "../controllers/authController";

import { localAuth, schoolAuth } from "../middlewares/authMiddleware";

/**
 * @swagger
 * /api/auth/admin:
 *   post:
 *     summary: Authenticate User
 *     tags: [Auth]
 *     requestBody:
 *       description: Authenticate User
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                    type: string
 *                password:
 *                    type: string
 *             example:
 *                email: "satya@gmail.com"
 *                password: "*********"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {status: string, message: string, data: {} }
 *       400:
 *         description: Invalid request
 */
router.post("/admin", localAuth, login);

/**
 * @swagger
 * /api/auth/school:
 *   post:
 *     summary: Authenticate School
 *     tags: [Auth]
 *     requestBody:
 *       description: Authenticate School
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                email:
 *                    type: string
 *                password:
 *                    type: string
 *             example:
 *                email: "mathrusri@school.com"
 *                password: "*********"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               data: {status: string, message: string, data: {} }
 *       400:
 *         description: Invalid request
 */
router.post("/school", schoolAuth, schoolLogin);

//module.exports = router;
export default router;
