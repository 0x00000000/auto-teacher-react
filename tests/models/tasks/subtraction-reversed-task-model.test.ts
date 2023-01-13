import TaskFactory from '../../../src/classes/task-factory';
import BaseTaskModel from '../../../src/models/tasks/base-task-model';
import { TASK_TYPES } from '../../../src/constants';
import {TaskSettingsType} from "../../../src/types";
describe('BaseTaskModel', () => {
    const type: string = TASK_TYPES.SUBTRACTION_REVERSED;
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

            let param1: string, param2: string;
            if (exerciseParts[0].length) {
                const params1: any = /(\d+)\s*-/.exec(exerciseParts[0]);
                const params2: any = /=\s*(\d+)/.exec(exerciseParts[1]);
                expect(params1).toBeTruthy();
                expect(params2).toBeTruthy();
                param1 = params1[1];
                param2 = params2[1];
                expect(+param1 - +param2).toBe(+answers[0]);
            } else {
                const params: any = /-\s*(\d+)\s*=\s*(\d+)/.exec(exerciseParts[1]);
                expect(params).toBeTruthy();
                param1 = params[1];
                param2 = params[2];
                expect(+param1 + +param2).toBe(+answers[0]);
            }
        }
    });
});
