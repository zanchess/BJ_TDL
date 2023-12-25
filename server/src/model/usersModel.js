import { DataTypes } from 'sequelize';
import sequelize from '../data-access/dbConnection.js';

const UsersModel = sequelize.define(
    'Users',
    {
        _id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUID,
            allowNull: false
        },
        u_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        u_password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        u_role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'users',
        createdAt: false,
        updatedAt: false
    }
);

export default UsersModel;
