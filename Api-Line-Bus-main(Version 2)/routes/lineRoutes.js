import express from 'express';
import { LineController } from '../controllers/lineController.js';
import { authToken } from '../middlewares/authMiddleware.js';

const lineRoutes = express.Router();

//Cria Linha
lineRoutes.post('/linhas', authToken, LineController.create) //Admin

//Lista todas as Linhas
lineRoutes.get('/linhas', LineController.getAll);

//Busca Linha por Id
lineRoutes.get('/linhas/:id', LineController.getById);

//Atualiza Linha por Id
lineRoutes.put('/linhas/:id', authToken, LineController.update); //Admin

//Deleta Linha por Id
lineRoutes.delete('/linhas/:id', authToken, LineController.delete); //Admin

export default lineRoutes;