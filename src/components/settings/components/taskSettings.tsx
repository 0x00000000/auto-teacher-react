import React from 'react';

import SettingsModel from "../../../models/settings-model"
import TaskSettingsModel from "../../../models/task-settings-model";
import TaskFactory from "../../../classes/task-factory";

type Props = {
    taskType: string;
    settingsModel: SettingsModel;
    onTaskSettingsChange: (event: any, taskType: string, settingsKey: string) => void;
};

class TaskSettings extends React.Component<Props> {
    _taskFactory: TaskFactory = new TaskFactory();
    _taskSettingsModel: TaskSettingsModel = new TaskSettingsModel();

    constructor(props: Props) {
        super(props);
    }

    render() {
        return <>
            <h4>{this._taskFactory.getTaskCaption(this.props.taskType)}</h4>
            {this._taskSettingsModel.getKeysList().map((settingsKey: string) => (
                <div key={settingsKey}>
                    <label>{this._taskSettingsModel.getCaption(settingsKey)}:</label>
                    <input
                        type='text'
                        defaultValue={this.props.settingsModel.getTaskSetting(this.props.taskType, settingsKey)}
                        onChange={(event: any) => this.props.onTaskSettingsChange(event, this.props.taskType, settingsKey)}
                    />
                </div>
            ))}
        </>;
    }
}

export default TaskSettings;
