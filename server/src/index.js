import dotenv from 'dotenv';

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sequelize from './data-access/dbConnection.js';
import errorHandler from './middleware/errorHandling.js';
import authMiddleware from './middleware/authenticate/authMiddleware.js';
import UsersModel from './model/usersModel.js';
import TasksModel from './model/tasksModel.js';
import { loginHandler } from './controllers/usersController.js';
import { getAllTasksHandler, updateTaskHandler, deleteTaskHandler } from './controllers/tasksController.js';
import { tasksMock, userMock } from './mocks/dataBaseMocks.js';

// init dotenv
dotenv.config();

// Create server
const app = express();
const port = process.env.LOCAL_HOST || 3200;
const router = express.Router();

// Middlewares
app.use(authMiddleware);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(router);
app.use(errorHandler);
router.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    next();
});

// Route handling for tasks
router.route('/tasks');

// Route handling for logIn
router.route('/login').post(loginHandler);

router.route('/tasks/:page').get(getAllTasksHandler);

router.route('/tasks/:id').put(updateTaskHandler).delete(deleteTaskHandler);

// Sync sequelize and add init admin user and tasks
sequelize.sync({ force: true }).then(() => {
    app.listen(port, (err) => {
        if (err) {
            console.error('Something bad happened', err.message);
        }
        console.info(`Server is listening on ${port} click link: \x1b[36m http://localhost:${port} \x1b[0m `);
        UsersModel.create(userMock)
            .then(() => console.info('Init admin user added'))
            .catch((error) => console.log('INIT_USER_RECORD_ERROR', error));
        TasksModel.bulkCreate(tasksMock)
            .then(() => console.info('Init tasks added'))
            .catch((error) => console.log('INIT_TASK_RECORDS_ERROR', error));
    });
});

process.on('uncaughtException', (error) => {
    console.error(`UncaughtException occurred: ${error.message}`);
    sequelize.destroy();
    process.exit(1);
});

process.on('unhandledRejection', (reason) => {
    console.warn(`unhandled Promise Rejection occurred: ${reason.message}`);
});
