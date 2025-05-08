const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - email
 *         - password
 *         - phone
 *         - answer
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         userName:
 *           type: string
 *           description: User's full name
 *         email:
 *           type: string
 *           format: email
 *           description: User's email address (must be unique)
 *         password:
 *           type: string
 *           format: password
 *           description: User's password (will be hashed)
 *         address:
 *           type: array
 *           items:
 *             type: string
 *           description: User's addresses
 *         phone:
 *           type: string
 *           description: User's phone number
 *         usertype:
 *           type: string
 *           enum: [client, admin, vendor, driver]
 *           default: client
 *           description: User's role in the system
 *         profile:
 *           type: string
 *           format: uri
 *           default: https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png
 *           description: URL to user's profile picture
 *         answer:
 *           type: string
 *           description: Security question answer
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of user creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Register a new user
 *     description: Register a new user with the provided information. All fields are required except address.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *               - email
 *               - password
 *               - phone
 *               - answer
 *             properties:
 *               userName:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address (must be unique)
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (will be hashed)
 *                 example: password123
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *                 example: "1234567890"
 *               address:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: User's addresses
 *                 example: ["123 Main St", "456 Side St"]
 *               answer:
 *                 type: string
 *                 description: Security question answer
 *                 example: "My first pet's name"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Successfully Registered
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request - Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Please Provide All Fields
 *       409:
 *         description: Conflict - Email already registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Email Already Registered please Login
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error In Register API
 *                 error:
 *                   type: object
 */
router.post("/register", registerController);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Login user
 *     description: Authenticate a user and get JWT token valid for 7 days
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's registered email address
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Login Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT token valid for 7 days
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                     user:
 *                       allOf:
 *                         - $ref: '#/components/schemas/User'
 *                         - type: object
 *                           properties:
 *                             password:
 *                               type: string
 *                               description: Password will be undefined in response
 *                               example: undefined
 *       400:
 *         description: Bad request - Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Please Provide Email AND Password
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid Credentials
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: User Not Found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error In Login API
 *                 error:
 *                   type: object
 */
router.post("/login", loginController);

module.exports = router;
