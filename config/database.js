import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE
});