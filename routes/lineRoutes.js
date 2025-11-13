import express from 'express';
import { LineController } from '../controllers/lineController.js';
import { authToken } from '../middlewares/authMiddleware.js';

const lineRoutes = express.Router();

//Cria Linha
/**
 * @swagger
 * /linhas:
 *   post:
 *     summary: Create a line
 *     description: Used to create lines with a name and approx_route.
 *     tags:
 *       - [Linhas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - approx_route
 *             properties:
 *               name:
 *                 type: string
 *                 example: Linha 5 - Xingu
 *               approx_route:
 *                 type: double
 *                 example: 10
 *     responses:
 *       201:
 *         description: Line created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: Linha 5 - Xingu
 *                 approx_route:
 *                   type: double
 *                   example: 10
 *       400:
 *         description: Bad request - missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields: name or approx_route"
 */
lineRoutes.post('/linhas', authToken, LineController.create) //Admin

//Lista todas as Linhas
/**
 * @swagger
 * /linhas:
 *   get:
 *     summary: List all lines
 *     description: Used to retrieve a list of all registered users.
 *     tags:
 *       - Linhas
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Linha 5 - Xingu
 *                   approx_route:
 *                     type: double
 *                     example: 10
 *       404:
 *         description: Not found - missing parameters.
 */
lineRoutes.get('/linhas', LineController.getAll);

//Busca Linha por Id
/**
 * @swagger
 * /linhas/{id}:
 *   get:
 *     summary: Return a line by ID
 *     description: Used to return a line by ID.
 *     tags:
 *       - Linhas
 *     parameters:
 *       - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: line ID
 *     responses:
 *       200:
 *         description: Line get by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Linha 5 - Xingu
 *                   approx_route:
 *                     type: double
 *                     example: 10
 *       404:
 *         description: Not found - missing parameters.
 */ 
lineRoutes.get('/linhas/:id', LineController.getById);

//Atualiza Linha por Id
/**
 * @swagger
 * /linhas/{id}:
 *   put:
 *     summary: Update a line by ID
 *     description: Used to update a line by ID.
 *     tags:
 *       - [Linhas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - approx_route
 *             properties:
 *               name:
 *                 type: string
 *                 example: Linha 5 - Xingu
 *               approx_route:
 *                 type: double
 *                 example: 10.3
 *     responses:
 *       200:
 *         description: Line successfully updated by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Linha 5 - Xingu
 *                   approx_route:
 *                     type: double
 *                     example: 10.3
 *       404:
 *         description: Not found - missing parameters.
 */ 
lineRoutes.put('/linhas/:id', authToken, LineController.update); //Admin

//Deleta Linha por Id
/**
 * @swagger
 * /linhas/{id}:
 *   delete:
 *     summary: Delete a line by ID
 *     description: Used to delete a line by ID.
 *     tags:
 *       - [Linhas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: line ID
 *     responses:
 *       200:
 *         description: Line successfully deleted by ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Linha 5 - Xingu
 *                   approx_route:
 *                     type: double
 *                     example: 10.3
 *       401:
 *         description: Unauthorized - missing token JWT.
 */ 
lineRoutes.delete('/linhas/:id', authToken, LineController.delete); //Admin

export default lineRoutes;