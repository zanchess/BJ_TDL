import { PAGE_SIZE, TASK_STATUSES } from '../constants/contants.js';
import { v4 as uuidv4 } from 'uuid';

export default class TasksService {
    constructor(tasksModel) {
        this.tasks = tasksModel;
    }

    async getAllTasks(page) {
        try {
            console.info('Service: executing getTasks');
            const allTasksForPage = await this.tasks.findAll({
                limit: PAGE_SIZE,
                offset: (page - 1) * PAGE_SIZE,
                raw: true
            });
            const totalTaskAmount = await this.getTotalTasks();

            return {
                tasksForPage: structuredClone(allTasksForPage),
                page,
                totalTaskAmount
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateTask(id, task) {
        try {
            console.info(`Service: executing updateTask(id = ${id}, task = ${JSON.stringify(task)}).`);

            const taskValues = Object.values(TASK_STATUSES);
            if (!taskValues.includes(task.status)) {
                throw new Error(`Can\'t to update task with unexpected status. Status should be equal to: ${taskValues}.`);
            }
            const [, [updatedTask]] = await this.tasks.update(structuredClone(task), {
                where: { id },
                returning: true,
                raw: true
            });

            return updatedTask;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteTask(id) {
        try {
            console.info(`Service: executing deleteTask(id = ${id}.`);

            const deletedRows = await this.tasks.destroy({
                where: { id },
                returning: true
            });

            if (deletedRows > 0) {
                return { id: id, taskDeleted: true };
            } else {
                throw new Error(`No matching record found by id=${id} to delete`);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getTotalTasks() {
        try {
            console.info('Service: executing getTotalTasks');
            return this.tasks.count();
        } catch (error) {
            throw new Error(error);
        }
    }

    async addNewTask(task) {
        try {
            const taskToSave = structuredClone(task);
            taskToSave.id = uuidv4();

            console.info(`Service: executing addNewTask(task = ${JSON.stringify(task)})`);

            return this.tasks.create(taskToSave);
        } catch (error) {
            throw new Error(error);
        }
    }
}
