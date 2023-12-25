import { PAGE_SIZE, TASK_STATUSES } from '../constants/contants.js';

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
            throw new Error('Something was wrong during getting tasks from DB');
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
            console.info(`Service: executing updateTask(id = ${id}, task = ${JSON.stringify(task)})`);

            const taskValues = Object.values(TASK_STATUSES);
            if (!taskValues.includes(task.status)) {
                throw new Error(
                    `Can\'t to update task with unexpected status. Status should be equal to: ${taskValues}`
                );
            }
            const [, [updatedTask]] = await this.tasks.update(task, { where: { id }, returning: true, raw: true });

            return updatedTask;
        } catch (error) {
            throw new Error(error);
        }
    }
}
