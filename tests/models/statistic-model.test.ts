import StatisticModel from '../../src/models/statistic-model';
import DataProviderMemory from "../../src/data-providers/data-provider-memory";
import DataProvider from "../../src/data-providers/data-provider";

describe('StatisticModel', () => {
    const type1 = 'type1';
    const type2 = 'type2';
    let dataProvider: DataProvider = new DataProviderMemory();
    let statistic: StatisticModel = new StatisticModel(type1, dataProvider);

    const initStatistic = function () {
        dataProvider = new DataProviderMemory();
        statistic = new StatisticModel(type1, dataProvider);
    }

    beforeEach(() => {
        initStatistic();
    });

    test('Check getting and increasing statistic', () => {
        let gotData: any;

        expect(statistic.getTotalLevel()).toBe(0);
        expect(statistic.getTotalScore()).toBe(0);
        expect(statistic.getTotalCounter()).toBe(0);
        expect(statistic.getSessionScore()).toBe(0);
        expect(statistic.getSessionCounter()).toBe(0);

        statistic.incScore(7);
        statistic.incCounter(11);

        expect(statistic.getTotalLevel()).toBe(1);
        expect(statistic.getTotalScore()).toBe(7);
        expect(statistic.getTotalCounter()).toBe(11 + 1);
        expect(statistic.getSessionScore()).toBe(7);
        expect(statistic.getSessionCounter()).toBe(11 + 1);

        gotData = statistic.incScore(700, 3);
        expect(gotData?.score).toBe(707);
        expect(gotData?.counter).toBe(11 + 1 + 3);

        gotData = statistic.incCounter(900);
        expect(gotData).toBe(911 + 1 + 3);

        expect(statistic.getTotalLevel()).toBe(8);
        expect(statistic.getTotalScore()).toBe(707);
        expect(statistic.getTotalCounter()).toBe(911 + 1 + 3);
        expect(statistic.getSessionScore()).toBe(707);
        expect(statistic.getSessionCounter()).toBe(911 + 1 + 3);
    });

    test('Check statistic for different types', () => {
        statistic.incScore(19);
        statistic.incCounter(23);

        expect(statistic.getTotalLevel()).toBe(1);
        expect(statistic.getTotalScore()).toBe(19);
        expect(statistic.getTotalCounter()).toBe(23 + 1);
        expect(statistic.getSessionScore()).toBe(19);
        expect(statistic.getSessionCounter()).toBe(23 + 1);

        statistic.initForType(type1);

        expect(statistic.getTotalLevel()).toBe(1);
        expect(statistic.getTotalScore()).toBe(19);
        expect(statistic.getTotalCounter()).toBe(23 + 1);
        expect(statistic.getSessionScore()).toBe(0);
        expect(statistic.getSessionCounter()).toBe(0);

        statistic.initForType(type2);

        statistic.incScore(17);
        statistic.incCounter(5);

        expect(statistic.getTotalLevel()).toBe(1);
        expect(statistic.getTotalScore()).toBe(17);
        expect(statistic.getTotalCounter()).toBe(5 + 1);
        expect(statistic.getSessionScore()).toBe(17);
        expect(statistic.getSessionCounter()).toBe(5 + 1);

        statistic.initForType(type1);

        expect(statistic.getTotalLevel()).toBe(1);
        expect(statistic.getTotalScore()).toBe(19);
        expect(statistic.getTotalCounter()).toBe(23 + 1);
        expect(statistic.getSessionScore()).toBe(0);
        expect(statistic.getSessionCounter()).toBe(0);

        statistic.initForType(type2);

        expect(statistic.getTotalLevel()).toBe(1);
        expect(statistic.getTotalScore()).toBe(17);
        expect(statistic.getTotalCounter()).toBe(5 + 1);
        expect(statistic.getSessionScore()).toBe(0);
        expect(statistic.getSessionCounter()).toBe(0);
    });

    test('Check saving statistic by data provider', () => {
        dataProvider = new DataProviderMemory();
        statistic = new StatisticModel(type1, dataProvider);

        statistic.incScore(31);
        statistic.incCounter(37);

        expect(statistic.getTotalLevel()).toBe(1);
        expect(statistic.getTotalScore()).toBe(31);
        expect(statistic.getTotalCounter()).toBe(37 + 1);
        expect(statistic.getSessionScore()).toBe(31);
        expect(statistic.getSessionCounter()).toBe(37 + 1);

        statistic = new StatisticModel(type1, dataProvider);

        expect(statistic.getTotalLevel()).toBe(1);
        expect(statistic.getTotalScore()).toBe(31);
        expect(statistic.getTotalCounter()).toBe(37 + 1);
        expect(statistic.getSessionScore()).toBe(0);
        expect(statistic.getSessionCounter()).toBe(0);

    });
});
