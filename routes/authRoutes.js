const appRoot = require("app-root-path");
const express = require("express");
//const passport = require("passport");
const router = express.Router();

const { login, schoolLogin } = require("../controllers/authController");
const {
  localAuth,
  schoolAuth,
} = require(`${appRoot}/middlewares/authMiddleware`);

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

module.exports = router;
