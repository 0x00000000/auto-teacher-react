import StorageModel from './storage-model';

type SessionData = {
    counter: number,
    score: number,
};

class StatisticModel {
    _type: string = '';
    _storage: StorageModel = new StorageModel();
    _statisticData: any = null;
    _sessionData: SessionData = {counter: 0, score: 0,};

    constructor(type: string) {
        this.init(type);
    }

    init(type: string) {
        this._type = type;
        this._statisticData = this._storage.get(this._type);
        this._sessionData = {counter: 0, score: 0,};
    }

    getTotalCounter(): number {
        return this._statisticData?.counter ?? 0;
    }

    getTotalScore(): number {
        return this._statisticData?.score ?? 0;
    }

    getSessionCounter(): number {
        return this._sessionData.counter;
    }

    getSessionScore(): number {
        return this._sessionData.score;
    }

    incCounter(counter: number): number {
        this._statisticData = this._storage.increase(this._type, {counter: counter,});
        this._sessionData.counter += counter;
        return this._sessionData.counter;
    }

    incScore(score: number, counter: number = 1): SessionData {
        this._statisticData = this._storage.increase(this._type, {score: score, counter: counter,});
        this._sessionData.score += score;
        return this._sessionData;
    }

}

export default StatisticModel;
