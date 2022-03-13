const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');

// Tag
/**
 * @swagger
 *  tags:
 *   name: User
 */

// Component
/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required: 
 *                  - name
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: User id
 *                  username:
 *                      type: string
 *                      description: User name
 *                  email:
 *                      type: string
 *                      description: User email
 *                  password:
 *                      type: string
 *                      description: User password
 *                  UserTypeId:
 *                      type: integer
 *                      description: User type id
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     description: Creates a new user
 *     tags: [User]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/User'
 *     responses:
 *      201:
 *         description: The created user
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/User'
 *      400:
 *          description: Error creating user
 */
 router.post('/signup', usersController.signup);

 /**
 * @swagger
 * /user/signin:
 *   post:
 *     description: Login user
 *     tags: [User]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  type: object
 *                  properties:
 *                      username: 
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *      200:
 *         description: The user data
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/User'
 *      400:
 *          description: Error login user
 */
 router.post('/signin', usersController.signin);

module.exports = router;