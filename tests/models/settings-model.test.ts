import SettingsModel from '../../src/models/settings-model';
import DataProviderMemory from '../../src/data-providers/data-provider-memory';
import DataProvider from "../../src/data-providers/data-provider";

describe('SettingsModel', () => {
    let settings: SettingsModel = new SettingsModel(new DataProviderMemory());
    let data: any = {
        parentPassword: '123~!@#$%^&*()_+=-><,./?\\ asdDSваВА.',
        parentEmail: 'test@example.com',
        childName: 'Piter',
        childBaseLevel: 5,
    };

    const initSettings = function () {
        settings = new SettingsModel(new DataProviderMemory());
    }

    beforeEach(() => {
        initSettings();
    });

    test('Check profile settings', () => {
        settings.setChildName(data.childName);
        settings.setChildBaseLevel(data.childBaseLevel)
        settings.setParentEmail(data.parentEmail);
        settings.setParentPassword(data.parentPassword);

        expect(settings.getChildName()).toBe(data.childName);
        expect(settings.getChildBaseLevel()).toBe(data.childBaseLevel);
        expect(settings.checkParentPassword(data.parentPassword)).toBe(true);
        expect(settings.getParentEmail()).toBe(data.parentEmail);
    });

    test('Check profile settings', () => {
        settings.setChildName(data.childName);
        settings.setChildBaseLevel(data.childBaseLevel)
        settings.setParentEmail(data.parentEmail);
        expect(settings.isValid()).toBe(false);
        settings.setParentPassword(data.parentPassword);
        expect(settings.isValid()).toBe(true);

        initSettings();
        settings.setChildBaseLevel(data.childBaseLevel)
        settings.setParentEmail(data.parentEmail);
        settings.setParentPassword(data.parentPassword);
        expect(settings.isValid()).toBe(false);
        settings.setChildName(data.childName);
        expect(settings.isValid()).toBe(true);
    });

    test('Check task settings', () => {
        let taskType1: string = 'testType1';
        let key1_1: string = 'maxLevel';
        let value1_1: string = '10';
        let key1_2: string = 'minLevel';
        let value1_2: string = '1';
        let taskType2: string = 'testType2';
        let key2_1: string = 'maxLevel';
        let value2_1: string = '8';
        let key2_2: string = 'minLevel';
        let value2_2: string = '3';
        settings.setChildName(data.childName);
        settings.setParentPassword(data.parentPassword);
        settings.setTaskSetting(taskType1, key1_1, value1_1);
        settings.setTaskSetting(taskType1, key1_2, value1_2);
        settings.setTaskSetting(taskType2, key2_1, value2_1);
        settings.setTaskSetting(taskType2, key2_2, value2_2);

        expect(settings.getTaskSetting(taskType1, key1_1)).toBe(value1_1);
        expect(settings.getTaskSetting(taskType1, key1_2)).toBe(value1_2);
        expect(settings.getTaskSetting(taskType2, key2_1)).toBe(value2_1);
        expect(settings.getTaskSetting(taskType2, key2_2)).toBe(value2_2);
    });

    test('Check save and load settings', () => {
        const dataProvider: DataProvider = new DataProviderMemory();
        settings = new SettingsModel(dataProvider);
        settings.setChildName(data.childName);
        settings.setChildBaseLevel(data.childBaseLevel)
        settings.setParentEmail(data.parentEmail);
        settings.setParentPassword(data.parentPassword);
        let taskType1: string = 'testType1';
        let key1_1: string = 'maxLevel';
        let value1_1: string = '10';
        let taskType2: string = 'testType2';
        let key2_1: string = 'maxLevel';
        let value2_1: string = '8';
        settings.setTaskSetting(taskType1, key1_1, value1_1);
        settings.setTaskSetting(taskType2, key2_1, value2_1);
        settings.save();

        settings = new SettingsModel(dataProvider);
        expect(settings.getChildName()).toBe(data.childName);
        expect(settings.getChildBaseLevel()).toBe(data.childBaseLevel);
        expect(settings.checkParentPassword(data.parentPassword)).toBe(true);
        expect(settings.getParentEmail()).toBe(data.parentEmail);
        expect(settings.getTaskSetting(taskType1, key1_1)).toBe(value1_1);
        expect(settings.getTaskSetting(taskType2, key2_1)).toBe(value2_1);
    });

});
