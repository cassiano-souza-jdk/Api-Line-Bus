import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Line = sequelize.define('line', {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false , 
        unique: true,
        validate: { len: [3,100] }
    },
    approx_route: { 
        type: DataTypes.DECIMAL(10,2), 
        allowNull: false 
    }
});