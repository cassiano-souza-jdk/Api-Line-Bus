import express from 'express';
import { AdminController } from "../controllers/adminController.js";
import { authToken } from '../middlewares/authMiddleware.js';

export const adminRoutes = express.Router();

//Criar Admin
adminRoutes.post('/admins', AdminController.create);

//Login Admin
adminRoutes.post('/loginAdmin', AdminController.login);

//Lista todos os Admins
adminRoutes.get('/admins', authToken, AdminController.getAll); //Admin

//Busca Admin por Id
adminRoutes.get('/admins/:id', authToken, AdminController.getById); //Admin

//Atualiza Admin por Id
adminRoutes.put('/admins/:id', authToken, AdminController.update); //Admin

//Deleta Admin por Id
adminRoutes.delete('/admins/:id', authToken, AdminController.delete); //Admin

export default adminRoutes;