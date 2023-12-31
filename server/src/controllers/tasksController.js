import TasksModel from '../model/tasksModel.js';
import TasksService from '../services/tasksService.js';
import { StatusCodes } from 'http-status-codes';

const taskService = new TasksService(TasksModel);

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

const updateTaskHandler = async (req, res, next) => {
    const task = req.body;
    const { id } = req.params;

    try {
        const finishedTask = await taskService.updateTask(id, task);

        await res.status(StatusCodes.OK);
        await res.send({ finished: true, message: 'Task is completed', updatedTask: structuredClone(finishedTask) });
    } catch (err) {
        err.customErrorMessage = `Task with id ${id} wasn't updated`;
        return next(err);
    }
};

const deleteTaskHandler = async (req, res, next) => {
    const { id } = req.params;

    try {
        const deletedTask = await taskService.deleteTask(id);

        await res.status(StatusCodes.OK);
        await res.send(deletedTask);
    } catch (err) {
        err.customErrorMessage = `Task ${id} wasn't deleted`;
        return next(err);
    }
};

const addNewTaskHandler = async (req, res, next) => {
    const task = req.body;

    try {
        const result = await taskService.addNewTask(task);

        res.status(StatusCodes.OK);
        res.send(result);
    } catch (err) {
        err.customErrorMessage = `Task ${task} wasn't added to task list`;
        return next(err);
    }
};

export { getAllTasksHandler, updateTaskHandler, deleteTaskHandler, addNewTaskHandler, taskService };
