import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import bcrypt from 'bcrypt';

export const Admin = sequelize.define('admin', {
    domain: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true},
    password: { 
        type: DataTypes.STRING, 
        allowNull: false
    }
});

Admin.beforeCreate(async (admin) => {
    admin.password = await bcrypt.hash(admin.password, 10);
});

Admin.beforeUpdate(async (admin) => {
    if(admin.changed('password')){
        admin.password = await bcrypt.hash(admin.password, 10);
    }
});