const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employee.controller');
const authenticateJWT = require("../middleware/authJwt")

// Tag
/**
 * @swagger
 *  tags:
 *   name: Employees
 */

// Component
/**
 * @swagger
 *  components:
 *      schemas:
 *          Employees:
 *              type: object
 *              required: 
 *                  - name
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Employee id
 *                  name:
 *                      type: string
 *                      description: Employee name
 *                  email:
 *                      type: string
 *                      description: Employee email
 *                  address:
 *                      type: string
 *                      description: Employee address
 *                  birthday:
 *                      type: string
 *                      format: date
 *                      description: Employee birthday
 *                  RoleId:
 *                      type: integer
 *                      description: Employee role id
 */

/**
 * @swagger
 * /employees/:
 *   get:
 *     description: Returns the list of employees
 *     tags: [Employees]
 *     parameters:
 *      - in: query
 *        name: name
 *        schema:
 *          type: string
 *        description: Employee name
 *      - in: query
 *        name: email
 *        schema: 
 *          type: string
 *        description: Employee email
 *      - in: query
 *        name: address
 *        schema:
 *          type: string
 *        description: Employee address
 *      - in: query
 *        name: birthday
 *        schema: 
 *          type: string
 *          format: date
 *        description: Employee birthday
 *      - in: query
 *        name: role id
 *        schema:
 *          type: integer
 *        description: Employee role id
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
 *         description: The list of employees
 */
router.get('/', [authenticateJWT], employeesController.get);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     description: Returns one employee
 *     tags: [Employees]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: employee id 
 *     responses:
 *       200:
 *         description: A employee
 *       404:
 *          description: Employee not found
 */
 router.get('/:id',[authenticateJWT], employeesController.getOne);

/**
 * @swagger
 * /employees/:
 *   post:
 *     description: Creates a new employee
 *     tags: [Employees]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/Employees'
 *     responses:
 *      201:
 *         description: The created employees
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/Employees'
 *      400:
 *          description: Error creating employee
 */
router.post('/',[authenticateJWT], employeesController.create);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     description: Update a employee
 *     tags: [Employees]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: employee id 
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/Employees'
 *     responses:
 *      204:
 *         description: The updated employees
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/Employees'
 *      400:
 *          description: Error updating employee
 */
router.put('/:id',[authenticateJWT], employeesController.update);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     description: Delete a employee
 *     tags: [Employees]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: employee id 
 *     responses:
 *      204:
 *         description: The deleted employees
 *      400:
 *          description: Error creating employee
 */
router.delete('/:id',[authenticateJWT], employeesController.remove);

module.exports = router;