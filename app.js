// app.js (versão sugerida)
import express from 'express';
import { sequelize } from './config/database.js';

import lineRoutes from './routes/lineRoutes.js';
import stopRoutes from './routes/stopRoutes.js';
import circuitRoutes from './routes/circuitRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

import { swaggerUi, swaggerSpec } from './docs/swagger.js';

const app = express();
app.use(express.json());

app.use(lineRoutes);
app.use(stopRoutes);
app.use(circuitRoutes);
app.use(adminRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export async function init() {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Banco de Dados sincronizado com sucesso!');

  }catch (erro) {
    console.error('Falha ao inicializar o Banco de Dados: ', erro);
    throw erro;
  }
}

export default app;
