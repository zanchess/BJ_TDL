import { DataTypes } from 'sequelize';
import sequelize from '../data-access/dbConnection.js';

const TasksModel = sequelize.define(
    'Tasks',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUID,
            allowNull: false,
            field: '_id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 't_name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 't_email'
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 't_status'
        }
    },
    {
        tableName: 'tasks',
        createdAt: false,
        updatedAt: false
    }
);

export default TasksModel;
