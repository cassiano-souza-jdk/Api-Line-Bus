import express from 'express';
import { StopController } from '../controllers/stopController.js';
import { authToken } from '../middlewares/authMiddleware.js';

const stopRoutes = express.Router();

//Cria Parada
stopRoutes.post('/paradas', authToken, StopController.create); //Admin

//Lista todas as Paradas
stopRoutes.get('/paradas', StopController.getAll);

//Busca Parada por Id
stopRoutes.get('/paradas/:id', StopController.getById);

//Atualiza Parada por Id
stopRoutes.put('/paradas/:id', authToken, StopController.update); //Admin

//Deleta Parada por Id
stopRoutes.delete('/paradas/:id', authToken, StopController.delete); //Admin

export default stopRoutes;