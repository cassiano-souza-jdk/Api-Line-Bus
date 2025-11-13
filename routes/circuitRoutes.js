import express from "express";
import { CircuitController } from "../controllers/circuitController.js";
import { authToken } from '../middlewares/authMiddleware.js';

const circuitRoutes = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Rotas
 *     description: Endpoints related to the routes and stops of the lines.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Circuit:
 *       type: object
 *       required:
 *         - sequence
 *         - approx_time
 *       properties:
 *         id:
 *           type: integer
 *         sequence:
 *           type: integer
 *           example: 1
 *         approx_time:
 *           type: string
 *           example: "08:30"
 *         lineId:
 *           type: integer
 *           example: 2
 *         stopId:
 *           type: integer
 *           example: 5
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

// Criar rota 
/**
 * @swagger
 * /rotas:
 *   post:
 *     summary: Create a new route (admin)
 *     tags: [Rotas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Circuit'
 *     responses:
 *       201:
 *         description: Route created successfully
 *       400:
 *         description: Error creating route.
 */
circuitRoutes.post("/rotas", authToken, CircuitController.create); //admin

// Listar todas as rotas
/**
 * @swagger
 * /rotas:
 *   get:
 *     summary: List all routes
 *     tags: [Rotas]
 *     responses:
 *       200:
 *         description: routes list
 */
circuitRoutes.get("/rotas", CircuitController.getAll); 

// Buscar rota por ID
/**
 * @swagger
 * /rotas/{id}:
 *   get:
 *     summary: Search for a route by ID.
 *     tags: [Rotas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da rota
 *     responses:
 *       200:
 *         description: Route found
 *       404:
 *         description: Route not found
 */
circuitRoutes.get("/rotas/:id", CircuitController.getById);                

// Atualizar rota por ID 
/**
 * @swagger
 * /rotas/{id}:
 *   put:
 *     summary: Update a route by ID (admin)
 *     tags: [Rotas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Circuit'
 *     responses:
 *       200:
 *         description: Route found
 *       404:
 *         description: Route not found
 */
circuitRoutes.put("/rotas/:id", authToken, CircuitController.update); //admin     

// Deletar rota por ID
/**
 * @swagger
 * /rotas/{id}:
 *   delete:
 *     summary: Delete a route by ID (admin)
 *     tags: [Rotas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Route deleted
 *       404:
 *         description: Route not deleted
 */
circuitRoutes.delete("/rotas/:id", authToken, CircuitController.delete); //admin   

// Adicionar uma parada a uma linha
/**
 * @swagger
 * /rotas/Adicionar:
 *   get:
 *     summary: List all the stops on a line.
 *     tags: [Rotas]
 *     parameters:
 *       - in: path
 *         name: idLinha
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of stops on the line
 *       404:
 *         description: Line not found
 */
circuitRoutes.post("/rotas/Adicionar/", authToken, CircuitController.create);

// Listar todas as paradas de uma linha
/**
 * @swagger
 * /rotas/paradas/{idParada}:
 *   get:
 *     summary: Lists all bus lines that pass through a specific stop.
 *     tags: [Rotas]
 *     parameters:
 *       - in: path
 *         name: idParada
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lines found
 *       404:
 *         description: Stop not found
 */
circuitRoutes.get("/rotas/linhas/:idLinha",CircuitController.getByLine);

// Listar todas as linhas que passam por uma parada específica
/**
 * @swagger
 * /rotas/paradas/{idParada}:
 *   get:
 *     summary: Lists all bus lines that pass through a specific stop.
 *     tags: [Rotas]
 *     parameters:
 *       - in: path
 *         name: idParada
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lines found
 *       404:
 *         description: Stop not found
 */
circuitRoutes.get("/rotas/paradas/:idParada", CircuitController.getCircuitsByStop);

// Atualizar parada em uma linha
/**
 * @swagger
 * /rotas/linhas/{idLinha}/rotas/{idParada}:
 *   put:
 *     summary: Updates a stop on a line (admin)
 *     tags: [Rotas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLinha
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idParada
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sequence:
 *                 type: integer
 *               approx_time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stop updated successfully.
 *       404:
 *         description: Stop not found
 */
circuitRoutes.put("/rotas/linhas/:idLinha/rotas/:idParada", authToken, CircuitController.updateStopInLine);

// Deletar parada de uma linha
/**
 * @swagger
 * /rotas/linhas/{idLinha}/rotas/{idParada}:
 *   delete:
 *     summary: Delete a stop from a line (admin)
 *     tags: [Rotas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLinha
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: idParada
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Stop removed from the line
 *       404:
 *         description: Stop not found
 */
circuitRoutes.delete("/rotas/linhas/:idLinha/rotas/:idParada", authToken, CircuitController.deleteStopInLine);

// Buscar parada específica de uma linha pela sequência
/**
 * @swagger
 * /linhas/{idLinha}/rotas/{sequence}:
 *   get:
 *     summary: Search for a specific stop on a line by sequence.
 *     tags: [Rotas]
 *     parameters:
 *       - in: path
 *         name: idLinha
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: sequence
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Stop found
 *       404:
 *         description: Stop not found
 */
circuitRoutes.get("/linhas/:idLinha/rotas/:sequence", CircuitController.getStopByLineAndSequence);

// Atualizar parada específica de uma linha pela sequência
/**
 * @swagger
 * /rotas/linhas/{idLinha}/rotas/{sequence}:
 *   put:
 *     summary: Updates a specific stop on a line using the sequence (admin)
 *     tags: [Rotas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: idLinha
 *         required: true
 *         schema:
 *           type: integer
 *       - in: path
 *         name: sequence
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               stopId:
 *                 type: integer
 *               approx_time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Stop updated successfully.
 *       404:
 *         description: Stop not found
 */
circuitRoutes.put("/rotas/linhas/:idLinha/rotas/:sequence", authToken, CircuitController.updateStopBySequence);

export default circuitRoutes;
