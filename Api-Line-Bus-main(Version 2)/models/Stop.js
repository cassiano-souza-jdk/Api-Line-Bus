import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Stop = sequelize.define('stop', {
    address: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    lat: { 
        type: DataTypes.DECIMAL(9,6), 
        allowNull: false 
    },
    long: { 
        type: DataTypes.DECIMAL(9,6), 
        allowNull: false 
    }
});
