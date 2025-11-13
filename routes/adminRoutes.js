import express from 'express';
import { AdminController } from "../controllers/adminController.js";
import { authToken } from '../middlewares/authMiddleware.js';

export const adminRoutes = express.Router();

//Criar Admin
/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Create a admin
 *     description: Used to create admins with a domain and password.
 *     tags:
 *       - Admins
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - domain
 *               - password
 *             properties:
 *               domain:
 *                 type: string
 *                 example: Lins
 *               password:
 *                 type: string
 *                 format: hash
 *                 example: 1234567890
 *     responses:
 *       201:
 *         description: Admin created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 1
 *                 domain:
 *                   type: string
 *                   example: Lins
 *                 password:
 *                   type: string
 *                   format: hash
 *                   example: 1234567890
 *       400:
 *         description: Bad request - missing or invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields: domain or password"
 */
adminRoutes.post('/admins', AdminController.create);

//Login Admin
/**
 * @swagger
 * /loginAdmin:
 *   post:
 *     summary: Login a admin.
 *     description: Used to login a admin with a domain and password and it will return the JWT token.
 *     tags:
 *       - [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - domain
 *               - password
 *             properties:
 *               domain:
 *                 type: string
 *                 example: Lins
 *               password:
 *                 type: string
 *                 format: hash
 *                 example: 1234567890
 *     responses:
 *       200:
 *         description: Successful Login.
 *       500:
 *         description: Internal Server Error - Unsuccessful Login.
 */
adminRoutes.post('/loginAdmin', AdminController.login);

//Lista todos os Admins
/**
 * @swagger
 * /admins:
 *   get:
 *     summary: List all admins
 *     description: Used to retrieve a list of all registered users.
 *     tags:
 *       - [Admins]
 *     security:
 *       - bearerAuth: []
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
 *                   domain:
 *                     type: string
 *                     example: Lins
 *                   password:
 *                     type: string
 *                     format: hash
 *                     example: 1234567890
 *       404:
 *         description: Not found - missing parameters.
 */
adminRoutes.get('/admins', authToken, AdminController.getAll); //Admin

//Busca Admin por Id
/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Return a admin by ID
 *     description: Used to return a admin by ID.
 *     tags:
 *       - [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *       domain: id
 *       required: true
 *       schema:
 *         type: integer
 *       description: admin ID
 *     responses:
 *       200:
 *         description: Admin get by ID.
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
 *                   domain:
 *                     type: string
 *                     example: Lins
 *                   password:
 *                     type: string
 *                     format: hash
 *                     example: 1234567890
 *       404:
 *         description: Not found - missing parameters.
 */ 
adminRoutes.get('/admins/:id', authToken, AdminController.getById); //Admin

//Atualiza Admin por Id
/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update a admin by ID
 *     description: Used to update a admin by ID.
 *     tags:
 *       - [Admins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - domain
 *               - password
 *             properties:
 *               domain:
 *                 type: string
 *                 example: Lins
 *               password:
 *                 type: string
 *                 format: hash
 *                 example: 9876543210
 *     responses:
 *       200:
 *         description: Admin successfully updated by ID.
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
 *                   domain:
 *                     type: string
 *                     example: Lins
 *                   password:
 *                     type: string
 *                     format: hash
 *                     example: 9876543210
 *       404:
 *         description: Not found - missing parameters.
 */ 
adminRoutes.put('/admins/:id', authToken, AdminController.update); //Admin

//Deleta Admin por Id
/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete a admin by ID
 *     description: Used to delete a admin by ID.
 *     tags:
 *       - [Admins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         domain: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: admin ID
 *     responses:
 *       200:
 *         description: Admin successfully deleted by ID.
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
 *                   domain:
 *                     type: string
 *                     example: Lins
 *                   password:
 *                     type: string
 *                     format: hash
 *                     example: 9876543210
 *       401:
 *         description: Unauthorized - missing token JWT.
 */ 
adminRoutes.delete('/admins/:id', authToken, AdminController.delete); //Admin

export default adminRoutes;