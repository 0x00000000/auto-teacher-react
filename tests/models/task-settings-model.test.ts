import TaskSettingsModel from '../../src/models/task-settings-model';

describe('TaskSettingsModel', () => {
    let taskSettings: TaskSettingsModel = new TaskSettingsModel();

    test('Check settings', () => {
        expect(taskSettings).toBeInstanceOf(TaskSettingsModel);

        const keyList: string[] = taskSettings.getKeysList();
        expect(keyList).toBeInstanceOf(Array);
        expect(keyList[0]).toBeTruthy();
        keyList.forEach((key) => {
            expect(typeof taskSettings.getCaption(key)).toBe('string');
            expect(taskSettings.getCaption(key)).toBeTruthy();
        });
    });
});
