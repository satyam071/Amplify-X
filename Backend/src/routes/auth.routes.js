const express = require ("express")
const authController = require("../controllers/auth.controller") 

const router = express.Router()
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: satyam
 *               email:
 *                 type: string
 *                 example: satyam@gmail.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register',authController.registerUser)

router.post('/login', authController.loginUser)

router.post('/logout', authController.logoutUser)

module.exports = router