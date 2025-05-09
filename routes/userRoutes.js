const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserProfile:
 *       type: object
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
 *           description: User's email address
 *         phone:
 *           type: string
 *           description: User's phone number
 *         address:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user's addresses
 *         usertype:
 *           type: string
 *           enum: [client, admin, vendor, driver]
 *           description: User's role in the system
 *         profile:
 *           type: string
 *           format: uri
 *           description: URL to user's profile picture
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
 * /user/getUser:
 *   get:
 *     tags: [Users]
 *     summary: Get current user information
 *     description: Retrieves the profile information of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID
 *                 example: 60d21b4967d0d8992e610c85
 *     responses:
 *       200:
 *         description: User information retrieved successfully
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
 *                   example: User Retrieved Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserProfile'
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
 *                   example: Internal Server Error
 */
router.get("/getUser", authMiddleware, getUserController);

/**
 * @swagger
 * /user/updateUser:
 *   put:
 *     tags: [Users]
 *     summary: Update user profile information
 *     description: Updates the profile information of the authenticated user. Users can only update their own profile unless they are admins.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID of the authenticated user
 *                 example: 60d21b4967d0d8992e610c85
 *               updateUserId:
 *                 type: string
 *                 description: ID of the user to update (only usable by admins)
 *                 example: 60d21b4967d0d8992e610c86
 *               userName:
 *                 type: string
 *                 description: New user name
 *                 example: John Doe
 *               phone:
 *                 type: string
 *                 description: New phone number
 *                 example: "1234567890"
 *               address:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: New addresses
 *                 example: ["123 Main St", "456 Side St"]
 *     responses:
 *       200:
 *         description: User updated successfully
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
 *                   example: User Updated Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       $ref: '#/components/schemas/UserProfile'
 *       403:
 *         description: Unauthorized - User doesn't have permission to update this profile
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
 *                   example: "Unauthorized: Only admins can update other users' profiles"
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
 *                   example: Internal Server Error
 */
router.put("/updateUser", authMiddleware, updateUserController);

/**
 * @swagger
 * /user/updatePassword:
 *   post:
 *     tags: [Users]
 *     summary: Update user password
 *     description: Updates the password of the authenticated user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID
 *                 example: 60d21b4967d0d8992e610c85
 *               oldPassword:
 *                 type: string
 *                 description: Current password
 *                 example: password123
 *               newPassword:
 *                 type: string
 *                 description: New password (min 6 characters)
 *                 example: newpassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
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
 *                   example: Password Updated Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: ID of the user whose password was updated
 *                       example: 60d21b4967d0d8992e610c85
 *       400:
 *         description: Invalid request (missing fields or password too short)
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
 *                   example: Please Provide Both Old and New Password
 *       401:
 *         description: Invalid old password
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
 *                   example: Invalid Old Password
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
 *                   example: Internal Server Error
 */
router.post("/updatePassword", authMiddleware, updatePasswordController);

/**
 * @swagger
 * /user/resetPassword:
 *   post:
 *     tags: [Users]
 *     summary: Reset password using security question
 *     description: Resets user password using email and security question answer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *               - answer
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 description: New password (min 6 characters)
 *                 example: newpassword123
 *               answer:
 *                 type: string
 *                 description: Security question answer
 *                 example: MyFirstPet
 *     responses:
 *       200:
 *         description: Password reset successfully
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
 *                   example: Password Reset Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       description: Email of the user whose password was reset
 *                       example: user@example.com
 *       400:
 *         description: Invalid request (missing fields or password too short)
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
 *       404:
 *         description: User not found or invalid security answer
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
 *                   example: User Not Found or Invalid Security Answer
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
 */
router.post("/resetPassword", resetPasswordController);

/**
 * @swagger
 * /user/deleteUser/{id}:
 *   delete:
 *     tags: [Users]
 *     summary: Delete user account
 *     description: Permanently deletes a user account. Only the account owner or an admin can perform this action.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID to delete
 *     responses:
 *       200:
 *         description: Account deleted successfully
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
 *                   example: Account Has Been Deleted Successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                       description: ID of the deleted user
 *                       example: 60d21b4967d0d8992e610c85
 *       403:
 *         description: Unauthorized - User doesn't have permission to delete this account
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
 *                   example: "Unauthorized: You can only delete your own account or you must be an admin"
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
 *                   example: Internal Server Error
 */
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
