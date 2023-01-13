import StorageModel from './storage-model';
import DataProvider from '../data-providers/data-provider';
import DataProviderCookie from '../data-providers/data-provider-cookie';

type SessionData = {
    counter: number,
    score: number,
};

class StatisticModel {
    private _type: string = '';
    private _storage: StorageModel;
    private _statisticData: any = null;
    private _sessionData: SessionData = {counter: 0, score: 0,};
    private _scoreForLevel: number = 100;

    constructor(type: string, dataProvider?: DataProvider) {
        if (dataProvider) {
            this._storage = new StorageModel(dataProvider);
        } else {
            this._storage = new StorageModel(new DataProviderCookie());
        }

        this.initForType(type);
    }

    public initForType(type: string) {
        this._type = type;
        this._statisticData = this._storage.get(this._type);
        this._sessionData = {counter: 0, score: 0,};
    }

    public getTotalCounter(): number {
        return this._statisticData?.counter ?? 0;
    }

    public getTotalScore(): number {
        return this._statisticData?.score ?? 0;
    }

    public getTotalLevel(): number {
        return Math.ceil(this.getTotalScore() / this._scoreForLevel);
    }

    public getSessionCounter(): number {
        return this._sessionData.counter;
    }

    public getSessionScore(): number {
        return this._sessionData.score;
    }

    public incCounter(counter: number): number {
        this._statisticData = this._storage.increase(this._type, {counter: counter,});
        this._sessionData.counter += counter;
        return this._sessionData.counter;
    }

    public incScore(score: number, counter: number = 1): SessionData {
        this._statisticData = this._storage.increase(this._type, {score: score, counter: counter,});
        this._sessionData.score += score;
        this._sessionData.counter += counter;
        return this._sessionData;
    }
}

export default StatisticModel;
