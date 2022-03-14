const express = require('express');
const router = express.Router();
const roleController = require('../controllers/role.controller');
const authenticateJWT = require("../middleware/authJwt")

// Tag
/**
 * @swagger
 *  tags:
 *   name: Roles
 */

// Component
/**
 * @swagger
 *  components:
 *      schemas:
 *          Roles:
 *              type: object
 *              required: 
 *                  - name
 *                  - salary
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: role id
 *                  name:
 *                      type: string
 *                      description: role name
 *                  salary:
 *                      type: number
 *                      format: double
 */

/**
 * @swagger
 * /roles/:
 *   get:
 *     description: Returns the list of roles
 *     tags: [Roles]
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: role name
 *      - in: query
 *        name: salary
 *        schema: 
 *          type: number
 *          format: double
 *        description: role salary
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
 *         description: The list of roles
 */
 router.get('/', [authenticateJWT], roleController.get);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     description: Returns one role
 *     tags: [Roles]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: role id 
 *     responses:
 *       200:
 *         description: A role
 *       404:
 *          description: Role not found
 */
 router.get('/:id',[authenticateJWT], roleController.getOne);

/**
 * @swagger
 * /roles/:
 *   post:
 *     description: Creates a new role
 *     tags: [Roles]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/Roles'
 *     responses:
 *      201:
 *         description: The created user types
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/Roles'
 *      400:
 *          description: Error creating role
 */
router.post('/',[authenticateJWT], roleController.create);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     description: Update a role
 *     tags: [Roles]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: role id 
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/Roles'
 *     responses:
 *      204:
 *         description: The updated role
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/Roles'
 *      400:
 *          description: Error updating role
 */
router.put('/:id',[authenticateJWT], roleController.update);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     description: Delete a role
 *     tags: [Roles]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: role id 
 *     responses:
 *      204:
 *         description: The deleted role
 *      400:
 *          description: Error removing role
 */
router.delete('/:id',[authenticateJWT], roleController.remove);

module.exports = router;
