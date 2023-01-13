import StorageModel from './storage-model';
import DataProvider from '../data-providers/data-provider';
import DataProviderCookie from '../data-providers/data-provider-cookie';

class SettingsModel {
    private _storageKey = 'STORAGE_SETTINGS';
    private _storage: StorageModel
    private _settingsData: any = null;

    constructor(dataProvider?: DataProvider) {
        if (dataProvider) {
            this._storage = new StorageModel(dataProvider);
        } else {
            this._storage = new StorageModel(new DataProviderCookie());
        }

        this._settingsData = this._storage.get(this._storageKey);
    }

    public setParentPassword(parentPassword: string): void {
        this._settingsData.parentPassword = parentPassword;
    }

    public getParentEmail(): string {
        return this._settingsData?.parentEmail ?? '';
    }

    public setParentEmail(parentEmail: string): void {
        this._settingsData.parentEmail = parentEmail;
    }

    public getChildName(): string {
        return this._settingsData?.childName ?? '';
    }

    public setChildName(childName: string): void {
        this._settingsData.childName = childName;
    }

    public getChildBaseLevel(): number {
        return this._settingsData?.childBaseLevel ?? 5;
    }

    public setChildBaseLevel(childBaseLevel: number): void {
        this._settingsData.childBaseLevel = childBaseLevel;
    }

    public setTaskSetting(taskType: string, key: string, value: string): void {
        if (! this._settingsData?.taskSettings) {
            this._settingsData.taskSettings = {};
        }
        if (! this._settingsData.taskSettings?.[taskType]) {
            this._settingsData.taskSettings[taskType] = {};
        }
        this._settingsData.taskSettings[taskType][key] = value;
    }

    public getTaskSetting(taskType: string, key: string): string[] {
        return this._settingsData?.taskSettings?.[taskType]?.[key];
    }

    public save(): boolean {
        if (this.isValid()) {
            this._storage.set(this._storageKey, this._settingsData);
            return true;
        } else {
            return false;
        }
    }

    public isValid(): boolean {
        return Boolean(this._settingsData?.childName && this._settingsData?.parentPassword);
    }

    public checkParentPassword(password: string): boolean {
        return this._settingsData?.parentPassword === password;
    }
}

export default SettingsModel;
