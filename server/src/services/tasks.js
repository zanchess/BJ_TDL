import { PAGE_SIZE } from '../constants/contants.js';

export default class TasksService {
    constructor(tasksModel) {
        this.tasks = tasksModel;
    }

    async getAllTasks(page) {
        try {
            console.info('Service: executing getTasks');
            return this.tasks.findAll({
                limit: PAGE_SIZE,
                offset: (page - 1) * PAGE_SIZE
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async getTotalTasks() {
        try {
            console.info('Service: executing getTotalTasks');
            return this.tasks.count();
        } catch (e) {
            throw new Error(e);
        }
    }

    async pushNewTask(task) {
        try {
            console.info(`Service: executing pushNewTask(task = ${JSON.stringify(task)})`);
            return this.tasks.create({ ...task });
        } catch (e) {
            throw new Error(e);
        }
    }

    async updateTask(id, task) {
        try {
            console.info(`Service: executing updateTask(id = ${id}, group = ${JSON.stringify(task)})`);
            return this.tasks.update(task, { where: { id } });
        } catch (e) {
            throw new Error(e);
        }
    }
}
