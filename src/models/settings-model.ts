import StorageModel from './storage-model';

class SettingsModel {
    _storageKey = 'STORAGE_SETTINGS';
    _storage: StorageModel = new StorageModel();
    _settingsData: any = null;

    constructor() {
        this._settingsData = this._storage.get(this._storageKey);
    }

    getParentPassword(): string {
        return '';
    }

    setParentPassword(parentPassword: string): void {
        this._settingsData.parentPassword = parentPassword;
    }

    getParentEmail(): string {
        return this._settingsData?.parentEmail ?? '';
    }

    setParentEmail(parentEmail: string): void {
        this._settingsData.parentEmail = parentEmail;
    }

    getChildName(): string {
        return this._settingsData?.childName ?? '';
    }

    setChildName(childName: string): void {
        this._settingsData.childName = childName;
    }

    getChildBaseLevel(): number {
        return this._settingsData?.childBaseLevel ?? 5;
    }

    setChildBaseLevel(childBaseLevel: number): void {
        this._settingsData.childBaseLevel = childBaseLevel;
    }

    setTaskSetting(taskType: string, key: string, value: string): void {
        if (! this._settingsData?.taskSettings) {
            this._settingsData.taskSettings = {};
        }
        if (! this._settingsData.taskSettings?.[taskType]) {
            this._settingsData.taskSettings[taskType] = {};
        }
        this._settingsData.taskSettings[taskType][key] = value;
    }

    getTaskSetting(taskType: string, key: string): string[] {
console.log('taskSettings', this._settingsData?.taskSettings);
        return this._settingsData?.taskSettings?.[taskType]?.[key];
    }

    save(): boolean {
        if (this.isValid()) {
            this._storage.set(this._storageKey, this._settingsData);
            return true;
        } else {
            return false;
        }
    }

    isValid(): boolean {
        return this._settingsData?.childName && this._settingsData?.parentPassword;
    }

    checkParentPassword(password: string): boolean {
        return this._settingsData?.parentPassword === password;
    }
}

export default SettingsModel;
