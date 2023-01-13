import TaskFactory from '../../src/classes/task-factory';
import BaseTaskModel from '../../src/models/tasks/base-task-model';
import { TASK_TYPES } from '../../src/constants';
import {TaskSettingsType} from "../../src/types";
describe('BaseTaskModel', () => {
    const taskSettings: TaskSettingsType = {
        baseLevel: 2,
        maxLevel: 10000,
        totalScore: 7,
    }
    let factory: TaskFactory = new TaskFactory();

    factory.getTasksTypesList().forEach(type => {
        test('Check ' + factory.getTaskCaption(type) + ' task', () => {
            const repeatTimes: number = 5;
            for (let i = 0; i < repeatTimes; i++) {
                if (i > 0) {
                    taskSettings.totalScore *= i * 17;
                }
                let task: BaseTaskModel = factory.createTask(type, taskSettings);

                expect(task.getType()).toBe(type);

                const exerciseParts: Array<string> = task.getExercisePartsList();
                const answers: Array<string> = task.getAnswersList();
                const answerCases: Array<string> = task.getAnswerCasesList();

                expect(exerciseParts.length).toBeTruthy();
                expect(answers.length).toBeTruthy();
                expect(answerCases.length).toBeTruthy();

                answers.forEach(value => {
                    expect(answerCases.includes(value)).toBeTruthy();
                });

                expect(task.checkAnswersList(answers)).toBeTruthy();
            }
        });
    });
});
