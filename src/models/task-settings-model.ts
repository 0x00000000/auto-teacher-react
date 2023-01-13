type TaskSettingsItemType = {
    key: string;
    caption: string;
    defaultValue: string;
};

class TaskSettingsModel {
    private _taskSettingsData: TaskSettingsItemType[] = [
        {
            key: 'maxLevel',
            caption: 'Max level',
            defaultValue: '',
        },
    ];

    public getKeysList(): string[] {
        let keysList: string[] = [];
        this._taskSettingsData.map(function(value: TaskSettingsItemType) {
            keysList.push(value.key);
        });
        return keysList;
    }

    public getCaption(key: string): string {
        let caption: string = '';
        let settingsItem: TaskSettingsItemType | undefined = this._taskSettingsData.find((element: TaskSettingsItemType) => (element.key === key));
        if (settingsItem) {
            caption = settingsItem.caption;
        }
        return caption;
    }
}

export default TaskSettingsModel;
