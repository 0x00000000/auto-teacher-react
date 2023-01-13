import TaskFactory from '../../src/classes/task-factory';
import { TaskSettingsType } from '../../src/types';
import BaseTaskModel from '../../src/models/tasks/base-task-model';

describe('TaskFactory', () => {
    let taskFactory: TaskFactory = new TaskFactory();

    test('Check tasks types', () => {
        let list: Array<string> = taskFactory.getTasksTypesList();

        expect(list).toBeInstanceOf(Array);

        list.forEach((type) => {
            expect(typeof type).toBe('string');
            expect(type).toBeTruthy();

            expect(taskFactory.getTaskCaption(type)).toBeTruthy();
        });
    });

    test('Check creating tasks', () => {
        let list: Array<string> = taskFactory.getTasksTypesList();
        let taskSettings: TaskSettingsType = {
            baseLevel: 5,
            maxLevel: 10,
            totalScore: 100,
        }

        list.forEach((type) => {
            let task: BaseTaskModel = taskFactory.createTask(type, taskSettings);
            expect(task).toBeInstanceOf(BaseTaskModel);
        });

        let notExistingTaskType: string = 'NOT_EXISTED_TASK_TYPE';
        let task: BaseTaskModel = taskFactory.createTask(notExistingTaskType, taskSettings);
        expect(task).toBeInstanceOf(BaseTaskModel);
    });
});