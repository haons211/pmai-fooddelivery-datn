const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       required:
 *         - title
 *         - coords
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         title:
 *           type: string
 *           description: Restaurant name/title
 *         imageUrl:
 *           type: string
 *           description: Restaurant image URL
 *         foods:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of food IDs available in the restaurant
 *         time:
 *           type: string
 *           description: Operating hours
 *         pickup:
 *           type: boolean
 *           description: Whether pickup is available
 *         delivery:
 *           type: boolean
 *           description: Whether delivery is available
 *         isOpen:
 *           type: boolean
 *           description: Whether the restaurant is currently open
 *         logoUrl:
 *           type: string
 *           description: Restaurant logo URL
 *         rating:
 *           type: number
 *           description: Restaurant rating
 *         ratingCount:
 *           type: number
 *           description: Number of ratings received
 *         code:
 *           type: string
 *           description: Restaurant unique code
 *         coords:
 *           type: object
 *           description: Restaurant coordinates
 *           properties:
 *             latitude:
 *               type: number
 *               description: Latitude coordinate
 *             longitude:
 *               type: number
 *               description: Longitude coordinate
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of restaurant creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 */

/**
 * @swagger
 * /restaurant/create:
 *   post:
 *     tags: [Restaurants]
 *     summary: Create a new restaurant
 *     description: Create a new restaurant with the provided information
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - coords
 *             properties:
 *               title:
 *                 type: string
 *                 description: Restaurant name/title
 *                 example: Italian Restaurant
 *               imageUrl:
 *                 type: string
 *                 description: Restaurant image URL
 *                 example: https://example.com/images/restaurant.jpg
 *               foods:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of food IDs available in the restaurant
 *                 example: ["60d21b4967d0d8992e610c85", "60d21b4967d0d8992e610c86"]
 *               time:
 *                 type: string
 *                 description: Operating hours
 *                 example: 9:00 AM - 10:00 PM
 *               pickup:
 *                 type: boolean
 *                 description: Whether pickup is available
 *                 example: true
 *               delivery:
 *                 type: boolean
 *                 description: Whether delivery is available
 *                 example: true
 *               isOpen:
 *                 type: boolean
 *                 description: Whether the restaurant is currently open
 *                 example: true
 *               logoUrl:
 *                 type: string
 *                 description: Restaurant logo URL
 *                 example: https://example.com/images/logo.png
 *               rating:
 *                 type: number
 *                 description: Restaurant rating
 *                 example: 4.5
 *               ratingCount:
 *                 type: number
 *                 description: Number of ratings received
 *                 example: 120
 *               code:
 *                 type: string
 *                 description: Restaurant unique code
 *                 example: REST-001
 *               coords:
 *                 type: object
 *                 description: Restaurant coordinates
 *                 properties:
 *                   latitude:
 *                     type: number
 *                     description: Latitude coordinate
 *                     example: 37.7749
 *                   longitude:
 *                     type: number
 *                     description: Longitude coordinate
 *                     example: -122.4194
 *     responses:
 *       201:
 *         description: Restaurant created successfully
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
 *                   example: New Restaurant Created Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     restaurant:
 *                       $ref: '#/components/schemas/Restaurant'
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
 *                   example: Please provide title and address
 *       401:
 *         description: Unauthorized - Missing or invalid token
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
 *                   example: Authentication failed
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
 *                   example: Internal Server Error
 *                 error:
 *                   type: object
 *                   description: Error details (only in development mode)
 */
router.post("/create", authMiddleware, createRestaurantController);

/**
 * @swagger
 * /restaurant/get-all:
 *   get:
 *     tags: [Restaurants]
 *     summary: Get all restaurants
 *     description: Retrieve a list of all restaurants
 *     responses:
 *       200:
 *         description: List of restaurants retrieved successfully
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
 *                   example: Restaurants Retrieved Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalCount:
 *                       type: number
 *                       description: Total number of restaurants
 *                       example: 10
 *                     restaurants:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Restaurant'
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
 *                   example: Internal Server Error
 *                 error:
 *                   type: object
 *                   description: Error details (only in development mode)
 */
router.get("/get-all", getAllRestaurantController);

/**
 * @swagger
 * /restaurant/get/{id}:
 *   get:
 *     tags: [Restaurants]
 *     summary: Get restaurant by ID
 *     description: Retrieve details of a specific restaurant by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant details retrieved successfully
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
 *                   example: Restaurant Retrieved Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     restaurant:
 *                       $ref: '#/components/schemas/Restaurant'
 *       400:
 *         description: Bad request - Missing restaurant ID
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
 *                   example: Please Provide Restaurant ID
 *       404:
 *         description: Restaurant not found
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
 *                   example: Restaurant Not Found
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
 *                   example: Internal Server Error
 *                 error:
 *                   type: object
 *                   description: Error details (only in development mode)
 */
router.get("/get/:id", getRestaurantByIdController);

/**
 * @swagger
 * /restaurant/delete/{id}:
 *   delete:
 *     tags: [Restaurants]
 *     summary: Delete a restaurant
 *     description: Delete a specific restaurant by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant deleted successfully
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
 *                   example: Restaurant Deleted Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     restaurantId:
 *                       type: string
 *                       description: ID of the deleted restaurant
 *                       example: 60d21b4967d0d8992e610c85
 *       400:
 *         description: Bad request - Missing restaurant ID
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
 *                   example: Please Provide Restaurant ID
 *       401:
 *         description: Unauthorized - Missing or invalid token
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
 *                   example: Authentication failed
 *       404:
 *         description: Restaurant not found
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
 *                   example: Restaurant Not Found
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
 *                   example: Internal Server Error
 *                 error:
 *                   type: object
 *                   description: Error details (only in development mode)
 */
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
