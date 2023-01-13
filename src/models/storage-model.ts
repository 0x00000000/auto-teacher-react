import DataProvider from '../data-providers/data-provider';

class StorageModel {
    private _dataProvider: DataProvider;

    constructor(dataProvider: DataProvider) {
        this._dataProvider = dataProvider;
    }

    public get(section: string): object {
        const storageData: any = this.getStorageData();
        if (section in storageData) {
            return storageData[section];
        } else {
            return {};
        }
    }

    public set(section: string, data: object) {
        const storageData: any = this.getStorageData();
        storageData[section] = data;
        this.setStorageData(storageData);
    }

    public increase(section: string, dataIncrement: any): object {
        const storageData: any = this.getStorageData();
        if (storageData[section]) {
            for (let key in dataIncrement) {
                if (typeof (storageData[section][key]) === 'number' && typeof(dataIncrement[key]) === 'number') {
                    storageData[section][key] += dataIncrement[key];
                } else {
                    storageData[section][key] = dataIncrement[key];
                }
            }
        } else {
            storageData[section] = dataIncrement;
        }
        this.setStorageData(storageData);
        return storageData[section];
    }

    private setStorageData(data: any): void {
        this._dataProvider.setData(data);
    }

    private getStorageData(): any {
        return this._dataProvider.getData();
    }
}

export default StorageModel;
