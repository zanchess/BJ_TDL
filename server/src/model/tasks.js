import { DataTypes } from 'sequelize';
import sequelize from '../data-access/db-connection.js';
import { TASK_STATUSES } from '../constants/contants.js';

const TasksModel = sequelize.define(
    'Tasks',
    {
        _id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUID,
            allowNull: false
        },
        t_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        t_email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        t_status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: 'tasks',
        createdAt: false,
        updatedAt: false
    }
);

export default TasksModel;
