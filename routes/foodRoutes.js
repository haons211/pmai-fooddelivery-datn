const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodsController,
  getSingleFoodController,
  getFoodByRestaurantController,
  updateFoodController,
  deleteFoodController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Food:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - restaurant
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         title:
 *           type: string
 *           description: Name of the food item
 *         description:
 *           type: string
 *           description: Description of the food item
 *         price:
 *           type: number
 *           description: Price of the food item
 *         imageUrl:
 *           type: string
 *           description: URL of the food image
 *           default: https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png
 *         foodTags:
 *           type: string
 *           description: Food tags/categories
 *         category:
 *           type: string
 *           description: Category ID of the food item
 *         code:
 *           type: string
 *           description: Food item code
 *         isAvailable:
 *           type: boolean
 *           description: Food availability status
 *           default: true
 *         restaurant:
 *           type: string
 *           description: Restaurant ID that serves this food
 *         rating:
 *           type: number
 *           description: Rating of the food item (1-5)
 *           default: 5
 *         ratingCount:
 *           type: string
 *           description: Number of ratings
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of food creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 *     Order:
 *       type: object
 *       required:
 *         - foods
 *         - payment
 *         - buyer
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated unique identifier
 *         foods:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               food:
 *                 type: string
 *                 description: Food item ID
 *               price:
 *                 type: number
 *                 description: Price of the food item
 *         payment:
 *           type: number
 *           description: Total payment amount
 *         buyer:
 *           type: string
 *           description: User ID who placed the order
 *         status:
 *           type: string
 *           description: Status of the order
 *           enum: [preparing, ready, on the way, delivered]
 *           default: preparing
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of order creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 */

/**
 * @swagger
 * /food/create:
 *   post:
 *     tags: [Foods]
 *     summary: Create a new food item
 *     description: Create a new food item with the provided information
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
 *               - description
 *               - price
 *               - restaurant
 *             properties:
 *               title:
 *                 type: string
 *                 description: Food item title
 *                 example: Margherita Pizza
 *               description:
 *                 type: string
 *                 description: Food item description
 *                 example: Classic pizza with tomato sauce and mozzarella
 *               price:
 *                 type: number
 *                 description: Food item price
 *                 example: 9.99
 *               imageUrl:
 *                 type: string
 *                 description: Food item image URL
 *                 example: https://example.com/images/pizza.jpg
 *               foodTags:
 *                 type: string
 *                 description: Food tags/categories
 *                 example: Italian, Pizza
 *               category:
 *                 type: string
 *                 description: Food category ID
 *                 example: 60d21b4967d0d8992e610c85
 *               code:
 *                 type: string
 *                 description: Food item code
 *                 example: PIZZA-01
 *               isAvailable:
 *                 type: boolean
 *                 description: Food availability status
 *                 example: true
 *               restaurant:
 *                 type: string
 *                 description: Restaurant ID
 *                 example: 60d21b4967d0d8992e610c85
 *               rating:
 *                 type: number
 *                 description: Food item rating
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: Food item created successfully
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
 *                   example: New Food Item Created Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     food:
 *                       $ref: '#/components/schemas/Food'
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
 *                   example: Please provide title, description, price and restaurant ID
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
router.post("/create", authMiddleware, createFoodController);

/**
 * @swagger
 * /food/get-all:
 *   get:
 *     tags: [Foods]
 *     summary: Get all food items
 *     description: Retrieve a list of all food items
 *     responses:
 *       200:
 *         description: List of food items retrieved successfully
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
 *                   example: Food Items Retrieved Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalFoods:
 *                       type: number
 *                       description: Total number of food items
 *                       example: 10
 *                     foods:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Food'
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
router.get("/get-all", getAllFoodsController);

/**
 * @swagger
 * /food/get/{id}:
 *   get:
 *     tags: [Foods]
 *     summary: Get a single food item
 *     description: Retrieve details of a specific food item by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item retrieved successfully
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
 *                   example: Food Item Retrieved Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     food:
 *                       $ref: '#/components/schemas/Food'
 *       400:
 *         description: Bad request - Missing ID
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
 *                   example: Please provide food ID
 *       404:
 *         description: Food item not found
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
 *                   example: Food not found
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
router.get("/get/:id", getSingleFoodController);

/**
 * @swagger
 * /food/get-by-restaurant/{id}:
 *   get:
 *     tags: [Foods]
 *     summary: Get food items by restaurant
 *     description: Retrieve all food items from a specific restaurant
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the restaurant
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food items retrieved successfully
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
 *                   example: Foods Retrieved By Restaurant Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     restaurant:
 *                       type: string
 *                       description: Restaurant ID
 *                       example: 60d21b4967d0d8992e610c85
 *                     foods:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Food'
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
 *                   example: Please provide restaurant ID
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
router.get("/get-by-restaurant/:id", getFoodByRestaurantController);

/**
 * @swagger
 * /food/update/{id}:
 *   put:
 *     tags: [Foods]
 *     summary: Update a food item
 *     description: Update details of a specific food item
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated Margherita Pizza
 *               description:
 *                 type: string
 *                 example: Updated classic pizza with tomato sauce and mozzarella
 *               price:
 *                 type: number
 *                 example: 10.99
 *               imageUrl:
 *                 type: string
 *                 example: https://example.com/images/updated-pizza.jpg
 *               foodTags:
 *                 type: string
 *                 example: Italian, Pizza, Premium
 *               category:
 *                 type: string
 *                 example: 60d21b4967d0d8992e610c85
 *               code:
 *                 type: string
 *                 example: PIZZA-01-PREMIUM
 *               isAvailable:
 *                 type: boolean
 *                 example: true
 *               restaurant:
 *                 type: string
 *                 example: 60d21b4967d0d8992e610c85
 *               rating:
 *                 type: number
 *                 example: 4.8
 *     responses:
 *       200:
 *         description: Food item updated successfully
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
 *                   example: Food Item Updated Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     food:
 *                       $ref: '#/components/schemas/Food'
 *       400:
 *         description: Bad request - Missing ID
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
 *                   example: Please provide food ID
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
 *         description: Food item not found
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
 *                   example: Food not found
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
router.put("/update/:id", authMiddleware, updateFoodController);

/**
 * @swagger
 * /food/delete/{id}:
 *   delete:
 *     tags: [Foods]
 *     summary: Delete a food item
 *     description: Delete a specific food item by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Food item deleted successfully
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
 *                   example: Food Item Deleted Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     foodId:
 *                       type: string
 *                       description: ID of the deleted food item
 *                       example: 60d21b4967d0d8992e610c85
 *       400:
 *         description: Bad request - Missing ID
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
 *                   example: Please provide food ID
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
 *         description: Food item not found
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
 *                   example: Food not found
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
router.delete("/delete/:id", authMiddleware, deleteFoodController);

/**
 * @swagger
 * /food/place-order:
 *   post:
 *     tags: [Foods]
 *     summary: Place a food order
 *     description: Place a new order with selected food items
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cart
 *               - id
 *             properties:
 *               cart:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     food:
 *                       type: string
 *                       description: Food item ID
 *                       example: 60d21b4967d0d8992e610c85
 *                     price:
 *                       type: number
 *                       description: Price of the food item
 *                       example: 9.99
 *               id:
 *                 type: string
 *                 description: User ID placing the order
 *                 example: 60d21b4967d0d8992e610c85
 *     responses:
 *       201:
 *         description: Order placed successfully
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
 *                   example: Order Placed Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - Missing cart items
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
 *                   example: Please provide food cart items
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
router.post("/place-order", authMiddleware, placeOrderController);

/**
 * @swagger
 * /food/order-status/{orderId}:
 *   put:
 *     tags: [Foods]
 *     summary: Update order status
 *     description: Update the status of an existing order. Permissions are role-based - admins can update any order's status, restaurant owners can update orders from their restaurant, and customers can only cancel their own orders.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID of the order
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [preparing, ready, on the way, delivered, cancelled]
 *                 description: New status of the order
 *                 example: on the way
 *     responses:
 *       200:
 *         description: Order status updated successfully
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
 *                   example: Order Status Updated Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     order:
 *                       $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request - Missing orderId or status
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
 *                   example: Please provide valid order ID and status
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
 *       403:
 *         description: Forbidden - User doesn't have permission to update this order's status
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
 *                   example: "Unauthorized: You don't have permission to update this order's status"
 *       404:
 *         description: Order not found
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
 *                   example: Order not found
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
router.put("/order-status/:orderId", authMiddleware, orderStatusController);

module.exports = router;
