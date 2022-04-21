import React from 'react';

import SettingsModel from "../../models/settings-model"

import Auth from './components/auth';
import Edit from './components/edit';

const SUBSECTIONS = {
    CHECK_PASSWORD: 'SUBSECTION_PASSWORD_CHECK',
    EDIT_SETTINGS: 'SUBSECTION_EDIT_SETTINGS',
};

type Props = {
    onHideNavigation: (shouldHide: boolean) => void,
};

type State = {
    subsection: string;
    message: string;
    formFields: {
        parentEmail: string;
    };
    title: string;
};

class Settings extends React.Component<Props, State> {
    _settingsModel: SettingsModel = new SettingsModel();
    _authPassword: string = '';
    _parentPassword: string = '';
    _passwordConfirm: string = '';
    _messagesList: any = {
        PASSWORD_CONFIRM: 'Password and confirmation are different',
        REQUIRED_FIELDS: 'Password and child name are required',
        WRONG_PASSWORD: 'Wrong password',
        SETTINGS_SAVED: 'Sattings saved',
    };

    _titleRegister: string = 'Registration';
    _titleSettings: string = 'Settings';

    constructor(props: Props) {
        super(props);

        if (! this._settingsModel.isValid()) {
            this.state = {
                subsection: SUBSECTIONS.EDIT_SETTINGS,
                message: '',
                formFields: {
                    parentEmail: '',
                },
                title: this._titleRegister,
            };
        } else {
            this.state = {
                subsection: SUBSECTIONS.CHECK_PASSWORD,
                message: '',
                formFields: {
                    parentEmail: this._settingsModel.getParentEmail(),
                },
                title: this._titleSettings,
            };
        }
    }

    onAuthPasswordChange(event: any) {
        this._authPassword = String(event.target?.value);
    }

    onAuthPasswordCheck() {
        if (this._settingsModel.checkParentPassword(this._authPassword)) {
            this._authPassword = '';
            this.setState(state => ({
                ...this.state,
                subsection: SUBSECTIONS.EDIT_SETTINGS,
            }));
        } else {
            this.setState(state => ({
                ...this.state,
                message: String(this._messagesList?.WRONG_PASSWORD),
            }));
        }
    }

    onPasswordConfirmChange(event: any) {
        this._passwordConfirm = String(event?.target?.value);
    }

    onParentPasswordChange(event: any) {
        this._parentPassword = String(event?.target?.value);
    }

    onParentEmailChange(event: any) {
        this._settingsModel.setParentEmail(String(event?.target?.value));
    }

    onChildNameChange(event: any) {
        this._settingsModel.setChildName(String(event?.target?.value));
    }

    onChildBaseLevelChange(event: any) {
        this._settingsModel.setChildBaseLevel(Number(event?.target?.value));
    }

    onSettingsSave() {
        let message: string = '';
        if (this._parentPassword) {
            if (this._parentPassword === this._passwordConfirm) {
                this._settingsModel.setParentPassword(this._parentPassword);
            } else {
                message = String(this._messagesList?.PASSWORD_CONFIRM);
            }
        }

        if (! message) {
            if (this._settingsModel.save()) {
                message = String(this._messagesList?.SETTINGS_SAVED);
            } else {
                message = String(this._messagesList?.REQUIRED_FIELDS);
            }
        }

        this.setState(state => ({
            ...this.state,
            message: message,
            title: this._titleSettings,
        }));

        this.props.onHideNavigation(false);
    }

    render() {
        return <div className="Settings">
            <h2>{this.state.title}</h2>
            <h4>{this.state.message}</h4>
            {Boolean(this.state.subsection === SUBSECTIONS.CHECK_PASSWORD) && (
                <Auth
                    onAuthPasswordChange={(event: any) => this.onAuthPasswordChange(event)}
                    onAuthPasswordCheck={() => this.onAuthPasswordCheck()}
                />
            )}
            {Boolean(this.state.subsection === SUBSECTIONS.EDIT_SETTINGS) && (
                <Edit
                    settingsModel={this._settingsModel}
                    formFields={this.state.formFields}
                    onPasswordConfirmChange={(event: any) => this.onPasswordConfirmChange(event)}
                    onParentPasswordChange={(event: any) => this.onParentPasswordChange(event)}
                    onParentEmailChange={(event: any) => this.onParentEmailChange(event)}
                    onChildNameChange={(event: any) => this.onChildNameChange(event)}
                    onChildBaseLevelChange={(event: any) => this.onChildBaseLevelChange(event)}
                    onSettingsSave={() => this.onSettingsSave()}
                />
            )}
        </div>;
    }
}

export default Settings;
