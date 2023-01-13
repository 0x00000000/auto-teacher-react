import TaskFactory from '../../../src/classes/task-factory';
import BaseTaskModel from '../../../src/models/tasks/base-task-model';
import { TASK_TYPES } from '../../../src/constants';
import {TaskSettingsType} from "../../../src/types";
describe('BaseTaskModel', () => {
    const type: string = TASK_TYPES.ADDICTION;
    const taskSettings: TaskSettingsType = {
        baseLevel: 2,
        maxLevel: 10000,
        totalScore: 7,
    }
    let factory: TaskFactory = new TaskFactory();
    let task: BaseTaskModel = factory.createTask(type, taskSettings);

    test('Check ' + factory.getTaskCaption(type) + ' task answers', () => {
        const repeatTimes: number = 5;
        for (let i = 0; i < repeatTimes; i++) {
            if (i > 0) {
                taskSettings.totalScore *= i * 17;
            }
            task = factory.createTask(type, taskSettings);

            const exerciseParts: Array<string> = task.getExercisePartsList();
            const answers: Array<string> = task.getAnswersList();
            const answerCases: Array<string> = task.getAnswerCasesList();

            expect(exerciseParts.length).toBe(1);
            expect(answers.length).toBe(1);

            const params: any = /(\d+)\s*\+\s*(\d+)/.exec(exerciseParts[0]);
            expect(params).toBeTruthy();
            expect(+params[1] + +params[2]).toBe(+answers[0]);
        }
    });
});
