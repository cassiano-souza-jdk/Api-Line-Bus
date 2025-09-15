import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Circuit = sequelize.define('circuit', {  
    sequence: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        validate: { min: 1 }
    },
    approx_time: { 
        type: DataTypes.STRING, 
        allowNull: false 
    }
});
