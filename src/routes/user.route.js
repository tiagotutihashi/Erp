const express = require('express');
const router = express.Router();
const usersController = require('../controllers/user.controller');
const authenticateJWT = require("../middleware/authJwt")

// Tag
/**
 * @swagger
 *  tags:
 *   name: Users
 */

// Component
/**
 * @swagger
 *  components:
 *      schemas:
 *          Users:
 *              type: object
 *              required: 
 *                  - name
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Users id
 *                  email:
 *                      type: string
 *                      description: Users email
 *                  password:
 *                      type: string
 *                      description: Users password
 *                  UserTypeId:
 *                      type: integer
 *                      description: Users type id
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     description: Creates a new users
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/Users'
 *     responses:
 *      201:
 *         description: The created users
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/Users'
 *      400:
 *          description: Error creating users
 */
 router.post('/signup', usersController.signup);

 /**
 * @swagger
 * /users/signin:
 *   post:
 *     description: Login users
 *     tags: [Users]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  type: object
 *                  properties:
 *                      email: 
 *                          type: string
 *                      password:
 *                          type: string
 *     responses:
 *      200:
 *         description: The users data
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/Users'
 *      400:
 *          description: Error login users
 */
 router.post('/signin', usersController.signin);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     description: Login users
 *     tags: [Users]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: users id 
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  type: object
 *                  properties:
 *                      email: 
 *                          type: string
 *                      password:
 *                          type: string
 *                      UserTypeId:
 *                          type: integer
 *     responses:
 *      204:
 *         description: The users updated
 *      400:
 *          description: Error updating users
 */
    router.put('/:id',[authenticateJWT], usersController.update)

module.exports = router;