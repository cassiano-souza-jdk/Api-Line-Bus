import express from "express";
import { CircuitController } from "../controllers/circuitController.js";
import { authToken } from '../middlewares/authMiddleware.js';

const circuitRoutes = express.Router();

// Criar rota 
circuitRoutes.post("/rotas", authToken, CircuitController.create); //admin

// Listar todas as rotas
circuitRoutes.get("/rotas", CircuitController.getAll); 

// Buscar rota por ID
circuitRoutes.get("/rotas/:id", CircuitController.getById);                

// Atualizar rota por ID 
circuitRoutes.put("/rotas/:id", authToken, CircuitController.update); //admin     

// Deletar rota por ID
circuitRoutes.delete("/rotas/:id", authToken, CircuitController.delete); //admin   

// Adicionar uma parada a uma linha
circuitRoutes.post("/rotas/Adicionar/", authToken, CircuitController.create);

// Listar todas as paradas de uma linha
circuitRoutes.get("/rotas/linhas/:idLinha",CircuitController.getByLine);

// Listar todas as linhas que passam por uma parada específica
circuitRoutes.get("/rotas/paradas/:idParada", CircuitController.getCircuitsByStop);

// Atualizar parada em uma linha
circuitRoutes.put("/rotas/linhas/:idLinha/rotas/:idParada", authToken, CircuitController.updateStopInLine);

// Deletar parada de uma linha
circuitRoutes.delete("/rotas/linhas/:idLinha/rotas/:idParada", authToken, CircuitController.deleteStopInLine);

// Buscar parada específica de uma linha pela sequência
circuitRoutes.get("/linhas/:idLinha/rotas/:sequence", CircuitController.getStopByLineAndSequence);

// Atualizar parada específica de uma linha pela sequência
circuitRoutes.put("/rotas/linhas/:idLinha/rotas/:sequence", authToken, CircuitController.updateStopBySequence);

export default circuitRoutes;
