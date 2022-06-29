import React from 'react';

import Settings from '../settings';
import Training from "../training";

import SettingsModel from "../../models/settings-model"

import Menu from './components/menu';

import {
    TASK_TYPES,
    SECTIONS,
} from "../../constants";

type Props = {};

type State = {
    section: string;
    hideNavigation: boolean;
}

class Navigator extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        const settingsModel: SettingsModel = new SettingsModel();
        if (settingsModel.isValid()) {
            this.state = {
                section: SECTIONS.TRAINING,
                hideNavigation: false,
            };
        } else {
            this.state = {
                section: SECTIONS.SETTINGS,
                hideNavigation: true,
            };
        }
    }

    onSelectSection(event: any): void {
        this.setState(state => ({
            ...state,
            section: event?.target?.value,
            hideNavigation: false,
        }));
    }

    onHideNavigation(shouldHide: boolean): void {
        this.setState(state => ({
            ...state,
            hideNavigation: shouldHide,
        }));

    }

    render() {
        return <>
            {! this.state.hideNavigation && (
                <Menu
                    onSelectSection={(event: any) => this.onSelectSection(event)}
                />
            )}
            {Boolean(this.state.section === SECTIONS.SETTINGS) && (
                <Settings
                    onHideNavigation={(shouldHide: boolean) => this.onHideNavigation(shouldHide)}
                />
            )}
            {Boolean(this.state.section === SECTIONS.TRAINING) && (
                <Training
                    tasksDefaultType={TASK_TYPES.ADDICTION}
                    onHideNavigation={(shouldHide: boolean) => this.onHideNavigation(shouldHide)}
                />
            )}
        </>;
    }
}

export default Navigator;
