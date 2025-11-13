import express from 'express';
import { StopController } from '../controllers/stopController.js';
import { authToken } from '../middlewares/authMiddleware.js';

const stopRoutes = express.Router();

//Cria Parada
/**
 * @swagger
 * /paradas:
 *   post:
 *     summary: Create a stop
 *     description: Used to create stops with a name and approx_route.
 *     tags:
 *       - [Paradas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - lat
 *               - long
 *             properties:
 *               address:
 *                 type: string
 *                 example: Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025
 *               lat:
 *                 type: double
 *                 example: -2169834
 *               long:
 *                 type: double
 *                 example: -4975020
 *     responses:
 *       201:
 *         description: Stop created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 address:
 *                   type: string
 *                   example: Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025
 *                 lat:
 *                   type: double
 *                   example: -2169834
 *                 long:
 *                   type: double
 *                   example: -4975020
 *       400:
 *         description: Bad request - missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields: address, lat e long"
 */
stopRoutes.post('/paradas', authToken, StopController.create); //Admin

//Lista todas as Paradas
/**
 * @swagger
 * /paradas:
 *   get:
 *     summary: List all stops
 *     description: Used to retrieve a list of all registered users.
 *     tags:
 *       - Paradas
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
 *                   address:
 *                     type: string
 *                     example: Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025
 *                   lat:
 *                     type: double
 *                     example: -2169834
 *                   long:
 *                     type: double
 *                     example: -4975020
 *       404:
 *         description: Not found - missing parameters.
 */
stopRoutes.get('/paradas', StopController.getAll);

//Busca Parada por Id
/**
 * @swagger
 * /paradas/{id}:
 *   get:
 *     summary: Return a stop by ID
 *     description: Used to return a stop by ID.
 *     tags:
 *       - Paradas
 *     parameters:
 *       - in: path
 *       name: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: stop ID
 *     responses:
 *       200:
 *         description: Stop get by ID.
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
 *                   address:
 *                     type: string
 *                     example: Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025
 *                   lat:
 *                     type: double
 *                     example: -2169834
 *                   long:
 *                     type: double
 *                     example: -4975020
 *       404:
 *         description: Not found - missing parameters.
 */ 
stopRoutes.get('/paradas/:id', StopController.getById);

//Atualiza Parada por Id
/**
 * @swagger
 * /paradas/{id}:
 *   put:
 *     summary: Update a stop by ID
 *     description: Used to update a stop by ID.
 *     tags:
 *       - [Paradas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - lat
 *               - long
 *             properties:
 *                address:
 *                  type: string
 *                  example: Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025
 *                lat:
 *                  type: double
 *                  example: -2269834
 *                long:
 *                  type: double
 *                  example: -4975020
 *     responses:
 *       200:
 *         description: Stop successfully updated by ID.
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
 *                   address:
 *                     type: string
 *                     example: Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025
 *                   lat:
 *                     type: double
 *                     example: -2269834
 *                   long:
 *                     type: double
 *                     example: -4975020
 *       404:
 *         description: Not found - missing parameters.
 */ 
stopRoutes.put('/paradas/:id', authToken, StopController.update); //Admin

//Deleta Parada por Id
/**
 * @swagger
 * /paradas/{id}:
 *   delete:
 *     summary: Delete a stop by ID
 *     description: Used to delete a stop by ID.
 *     tags:
 *       - [Paradas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: stop ID
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
 *                   address:
 *                     type: string
 *                     example: Estrada Mário Covas Junior , km 1 - Vila Guararapes, Lins - SP, 16403-025
 *                   lat:
 *                     type: double
 *                     example: -2269834
 *                   long:
 *                     type: double
 *                     example: -4975020
 *       401:
 *         description: Unauthorized - missing token JWT.
 */ 
stopRoutes.delete('/paradas/:id', authToken, StopController.delete); //Admin

export default stopRoutes;