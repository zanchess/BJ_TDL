import TasksModel from '../model/tasks.js';
import TasksService from '../services/tasks.js';
import { StatusCodes } from 'http-status-codes';

const taskService = new TasksService(TasksModel);

export const getTotalTasksHandler = async (req, res, next) => {
    try {
        const tasksAmount = await taskService.getTotalTasks();

        await res.status(StatusCodes.OK);
        await res.send({tasksAmount});
    } catch (err) {
        err.customErrorMessage = "Couldn't get tasks";
        return next(err);
    }
};

const getAllTasksHandler = async (req, res, next) => {
    try {
        const { page } = req.params;
        const allTasks = await taskService.getAllTasks(page);

        await res.status(StatusCodes.OK);
        await res.send(allTasks);
    } catch (err) {
        err.customErrorMessage = "Couldn't get tasks";
        return next(err);
    }
};

const completeTaskHandler = async (req, res, next) => {
    const group = req.body;
    const { id } = req.params;

    try {
        await taskService.updateGroupInDatabase(id, group);

        await res.status(StatusCodes.OK);
        await res.send({ completed: true, message: 'Task is completed' });
    } catch (err) {
        err.customErrorMessage = `Task with id ${id} not found`;
        return next(err);
    }
};

const deleteTaskHandler = async (req, res, next) => {
    const group = req.body;

    try {
        const newGroup = await taskService.pushNewGroup(group);

        await res.status(StatusCodes.OK);
        await res.send(newGroup);
    } catch (err) {
        err.customErrorMessage = "Group wasn't created";
        return next(err);
    }
};

const addNewTaskHandler = async (req, res, next) => {
    try {
        const result = await taskService.addUsersToGroup(req.params.groupId, req.body.userIds);

        if (result) {
            res.status(StatusCodes.OK);
            res.send({ message: 'User was added to group' });
        } else {
            res.status(StatusCodes.NOT_FOUND);
        }
    } catch (err) {
        err.customErrorMessage = `User wasn't add to group with ${req.params.groupId} and ${req.body.userIds} `;
        return next(err);
    }
};

export { getAllTasksHandler, completeTaskHandler, deleteTaskHandler, addNewTaskHandler, taskService };
