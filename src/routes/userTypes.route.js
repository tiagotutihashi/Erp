const express = require('express');
const router = express.Router();
const userTypesController = require('../controllers/userTypes.controller');
const authenticateJWT = require("../middleware/authJwt")

// Tag
/**
 * @swagger
 *  tags:
 *   name: User Types
 */

// Component
/**
 * @swagger
 *  components:
 *      schemas:
 *          UserType:
 *              type: object
 *              required: 
 *                  - name
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: User type id
 *                  name:
 *                      type: string
 *                      description: User type name
 */

/**
 * @swagger
 * /userTypes/:
 *   get:
 *     description: Returns the list of user types
 *     tags: [User Types]
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: user type name 
 *      - in: query
 *        name: page
 *        schema:
 *          type: integer
 *        description: page index
 *      - in: query
 *        name: perPage
 *        schema:
 *          type: integer
 *        description: itens per page
 *     responses:
 *       200:
 *         description: The list of user types
 */
router.get('/', [authenticateJWT], userTypesController.get);

/**
 * @swagger
 * /userTypes/{id}:
 *   get:
 *     description: Returns one user type
 *     tags: [User Types]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: user type id 
 *     responses:
 *       200:
 *         description: A user type
 *       404:
 *          description: User not found
 */
 router.get('/:id',[authenticateJWT], userTypesController.getOne);

/**
 * @swagger
 * /userTypes/:
 *   post:
 *     description: Creates a new user type
 *     tags: [User Types]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/UserType'
 *     responses:
 *      201:
 *         description: The created user types
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/UserType'
 *      400:
 *          description: Error creating user type
 */
router.post('/',[authenticateJWT], userTypesController.create);

/**
 * @swagger
 * /userTypes/{id}:
 *   put:
 *     description: Update a user type
 *     tags: [User Types]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: user type id 
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/UserType'
 *     responses:
 *      204:
 *         description: The updated user types
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/UserType'
 *      400:
 *          description: Error updating user type
 */
router.put('/:id',[authenticateJWT], userTypesController.update);

/**
 * @swagger
 * /userTypes/{id}:
 *   delete:
 *     description: Delete a user type
 *     tags: [User Types]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: user type id 
 *     responses:
 *      204:
 *         description: The deleted user types
 *      400:
 *          description: Error creating user type
 */
router.delete('/:id',[authenticateJWT], userTypesController.remove);

module.exports = router;