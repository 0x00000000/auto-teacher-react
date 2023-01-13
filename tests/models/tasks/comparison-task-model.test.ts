import TaskFactory from '../../../src/classes/task-factory';
import BaseTaskModel from '../../../src/models/tasks/base-task-model';
import { TASK_TYPES } from '../../../src/constants';
import {TaskSettingsType} from "../../../src/types";
describe('BaseTaskModel', () => {
    const type: string = TASK_TYPES.COMPARISON;
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

            expect(exerciseParts.length).toBe(2);
            expect(answers.length).toBe(1);

            const params1: any = /(\d+)/.exec(exerciseParts[0]);
            const params2: any = /(\d+)/.exec(exerciseParts[1]);
            expect(params1).toBeTruthy();
            expect(params2).toBeTruthy();
            const param1: number = +params1[1];
            const param2: number = +params2[1];

            if (param1 > param2) {
                expect(answers[0]).toBe('>');
            } else if (param1 < param2) {
                expect(answers[0]).toBe('<');
            } else {
                expect(answers[0]).toBe('=');
            }
        }
    });
});
