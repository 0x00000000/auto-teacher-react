import React from 'react';

import SettingsModel from "../../../models/settings-model"

type Props = {
    settingsModel: SettingsModel,
    onPasswordConfirmChange: (event: any) => void,
    onParentPasswordChange: (event: any) => void,
    onParentEmailChange: (event: any) => void,
    onChildNameChange: (event: any) => void,
    onChildBaseLevelChange: (event: any) => void,
    onSettingsSave: () => void,
    formFields: any,
};

type State = {
    formFields: any,
}
class Edit extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            formFields: this.props.formFields,
        }
    }

    render() {
        return <>
            <p>
                <label>Parent's password*:</label>
                <input
                    name='password'
                    type='password'
                    onChange={(event: any) => this.props.onParentPasswordChange(event)}
                />

            </p>
            <p>
                <label>Confirm password*:</label>
                <input
                    name='passwordConfirm'
                    type='password'
                    onChange={(event: any) => this.props.onPasswordConfirmChange(event)}
                />

            </p>
            <p>
                <label>Parent's e-mail:</label>
                <input
                    name='email'
                    type='text'
                    defaultValue={this.props.settingsModel.getParentEmail()}
                    onChange={(event: any) => this.props.onParentEmailChange(event)}
                />
            </p>
            <p>
                <label>Child name*:</label>
                <input
                    name='name'
                    type='text'
                    defaultValue={this.props.settingsModel.getChildName()}
                    onChange={(event: any) => this.props.onChildNameChange(event)}
                />
            </p>
            <p>
                <label>Start from level*:</label>
                <input
                    name='startLevel'
                    type='text'
                    defaultValue={this.props.settingsModel.getChildBaseLevel()}
                    onChange={(event: any) => this.props.onChildBaseLevelChange(event)}
                />
            </p>
            <p>
                <button
                    onClick={() => this.props.onSettingsSave()}
                >Save</button>
            </p>
        </>;
    }
}

export default Edit;
