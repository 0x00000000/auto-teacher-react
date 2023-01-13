import React from 'react';

import TaskSettings from "./taskSettings";
import SettingsModel from "../../../models/settings-model"
import TaskFactory from "../../../classes/task-factory";

type Props = {
    isRegistration: boolean;
    settingsModel: SettingsModel;
    onPasswordConfirmChange: (event: any) => void;
    onParentPasswordChange: (event: any) => void;
    onParentEmailChange: (event: any) => void;
    onChildNameChange: (event: any) => void;
    onChildBaseLevelChange: (event: any) => void;
    onTaskSettingsChange: (event: any, taskType: string, settingsKey: string) => void;
    onSettingsSave: () => void;
    formFields: any;
};

type State = {
    formFields: any,
}
class Edit extends React.Component<Props, State> {
    private _taskFactory: TaskFactory = new TaskFactory();
    private _tasksTypesList: string[] = [];

    constructor(props: Props) {
        super(props);

        this.state = {
            formFields: this.props.formFields,
        }
        this._tasksTypesList = this._taskFactory.getTasksTypesList();
    }

    render() {
        return <>
            <div>
                <label>Parent's password*:</label>
                <input
                    type='password'
                    onChange={(event: any) => this.props.onParentPasswordChange(event)}
                />

            </div>
            <div>
                <label>Confirm password*:</label>
                <input
                    type='password'
                    onChange={(event: any) => this.props.onPasswordConfirmChange(event)}
                />

            </div>
            <div>
                <label>Child name*:</label>
                <input
                    type='text'
                    defaultValue={this.props.settingsModel.getChildName()}
                    onChange={(event: any) => this.props.onChildNameChange(event)}
                />
            </div>
            {! this.props.isRegistration && (
                <>
                    <div>
                        <label>Parent's e-mail:</label>
                        <input
                            type='text'
                            defaultValue={this.props.settingsModel.getParentEmail()}
                            onChange={(event: any) => this.props.onParentEmailChange(event)}
                        />
                    </div>
                    <div>
                        <label>Start from level:</label>
                        <input
                            type='text'
                            defaultValue={this.props.settingsModel.getChildBaseLevel()}
                            onChange={(event: any) => this.props.onChildBaseLevelChange(event)}
                        />
                    </div>

                    <h3>Tasks settings</h3>
                    {this._tasksTypesList.map((type: string, key: number) => (
                        <div key={key}>
                            <TaskSettings
                                taskType={type}
                                settingsModel={this.props.settingsModel}
                                onTaskSettingsChange={(event: any, taskType: string, settingsKey: string) => this.props.onTaskSettingsChange(event, taskType, settingsKey)}
                            />
                        </div>
                    ))}
                </>
            )}

            <div>
                <button
                    onClick={() => this.props.onSettingsSave()}
                >Save</button>
            </div>
        </>;
    }
}

export default Edit;
