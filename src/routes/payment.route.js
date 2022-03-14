const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authenticateJWT = require("../middleware/authJwt")

// Tag
/**
 * @swagger
 *  tags:
 *   name: Payments
 */

// Component
/**
 * @swagger
 *  components:
 *      schemas:
 *          Payments:
 *              type: object
 *              required: 
 *                  - name
 *                  - amount
 *                  - discount
 *                  - EmployeeId
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: payment id
 *                  amount:
 *                      type: number
 *                      format: double
 *                      description: payment amount
 *                  discount:
 *                      type: number
 *                      format: double
 *                      description: payment discount
 *                  EmployeeId:
 *                      type: integer
 *                      description: payment EmployeeId
 */

/**
 * @swagger
 * /payments/:
 *   get:
 *     description: Returns the list of payments
 *     tags: [Payments]
 *     parameters:
 *      - in: query
 *        name: amount
 *        schema:
 *          type: number
 *          format: double
 *        description: payment amount
 *      - in: query
 *        name: discount
 *        schema: 
 *          type: number
 *          format: double
 *        description: payment discount
 *      - in: query
 *        name: EmployeeId
 *        schema: 
 *          type: integer
 *        description: payment EmployeeId
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
 *         description: The list of payments
 */
 router.get('/', [authenticateJWT], paymentController.get);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     description: Returns one payment
 *     tags: [Payments]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: payment id 
 *     responses:
 *       200:
 *         description: A payment
 *       404:
 *          description: Payment not found
 */
 router.get('/:id',[authenticateJWT], paymentController.getOne);

/**
 * @swagger
 * /payments/:
 *   post:
 *     description: Creates a new payment
 *     tags: [Payments]
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/Payments'
 *     responses:
 *      201:
 *         description: The created payment
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/Payments'
 *      400:
 *          description: Error creating payment
 */
router.post('/',[authenticateJWT], paymentController.create);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     description: Update a payment
 *     tags: [Payments]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: payment id 
 *     requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema: 
 *                  $ref: '#/components/schemas/Payments'
 *     responses:
 *      204:
 *         description: The updated payment
 *         content:
 *          application/json:
 *              $ref: '#/components/schemas/Payments'
 *      400:
 *          description: Error updating payment
 */
router.put('/:id',[authenticateJWT], paymentController.update);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     description: Delete a payment
 *     tags: [Payments]
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: integer
 *        required: true
 *        description: payment id 
 *     responses:
 *      204:
 *         description: The deleted payment
 *      400:
 *          description: Error removing payment
 */
router.delete('/:id',[authenticateJWT], paymentController.remove);

module.exports = router;
