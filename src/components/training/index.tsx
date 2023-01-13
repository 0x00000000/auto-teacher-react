import React from 'react';

import StatisticModel from '../../models/statistic-model';
import SettingsModel from '../../models/settings-model';

import Menu from './components/menu';

import Task from '../task';

type Props = {
    tasksDefaultType: string;
    onHideNavigation: (shouldHide: boolean) => void;
};

type State = {
    sessionScore: number;
    sessionCounter: number;
    totalScore: number;
    totalLevel: number;
    tasksType: string;
    typeSelected: boolean;
    readyToFinish: boolean;
};

class Training extends React.Component<Props, State> {
    _statisticModel: StatisticModel;
    _settingsModel: SettingsModel = new SettingsModel();

    constructor(props: Props) {
        super(props);

        this._statisticModel = new StatisticModel(props.tasksDefaultType);

        this.state = {
            sessionScore: this._statisticModel.getSessionScore(),
            sessionCounter: this._statisticModel.getSessionCounter(),
            totalScore: this._statisticModel.getTotalScore(),
            totalLevel: this._statisticModel.getTotalLevel(),
            tasksType: props.tasksDefaultType,
            typeSelected: false,
            readyToFinish: false,
        };
    }

    onTypeSelect(event: any): void {
        if (event.target?.value) {
            const type = String(event.target?.value);
            this._statisticModel.initForType(type);

            this.setState(state => ({
                ...state,
                sessionScore: this._statisticModel.getSessionScore(),
                sessionCounter: this._statisticModel.getSessionCounter(),
                totalScore: this._statisticModel.getTotalScore(),
                totalLevel: this._statisticModel.getTotalLevel(),
                tasksType: type,
                typeSelected: true,
                readyToFinish: false,
            }));
            this.props.onHideNavigation(true);
        }
    }

    onIncreaseScore(score?: number) {
        this._statisticModel.incScore(Number(score));
        this.setState(state => ({
            ...state,
            sessionScore: this._statisticModel.getSessionScore(),
            sessionCounter: this._statisticModel.getSessionCounter(),
            totalScore: this._statisticModel.getTotalScore(),
            totalLevel: this._statisticModel.getTotalLevel(),
            readyToFinish: false,
        }));
    }

    finishTraining() {
        if (! this.state.readyToFinish) {
            this.setState(state => ({
                ...state,
                readyToFinish: true,
            }));
        } else {
            this._statisticModel.initForType(this.props.tasksDefaultType);
            this.setState(state => ({
                sessionScore: this._statisticModel.getSessionScore(),
                sessionCounter: this._statisticModel.getSessionCounter(),
                totalScore: this._statisticModel.getTotalScore(),
                totalLevel: this._statisticModel.getTotalLevel(),
                tasksType: this.props.tasksDefaultType,
                typeSelected: false,
                readyToFinish: false,
            }));
            this.props.onHideNavigation(false);
        }
    }

    render() {
        return (
            <div className="training">
                <h2>Hello {this._settingsModel.getChildName()}</h2>
                {! this.state.typeSelected && (
                    <>
                        <h3>Select training</h3>
                        <Menu
                            onTypeSelect={(event: any) => this.onTypeSelect(event)}
                        />
                    </>
                )}
                {this.state.typeSelected && (
                    <>
                        <button
                            onClick={() => this.finishTraining()}
                        >{Boolean(this.state.readyToFinish) ? "Click one more time to finish" : "Finish training"}</button>
                        <h4>Score:&nbsp;{this.state.sessionScore}</h4>
                        <h4>Total&nbsp;score:&nbsp;{this.state.totalScore} (level:&nbsp;{this.state.totalLevel})</h4>
                        <hr/>
                        <Task
                            taskType={this.state.tasksType}
                            statisticModel={this._statisticModel}
                            settingsModel={this._settingsModel}
                            onIncreaseScore={(score?: number) => this.onIncreaseScore(score)}
                        />
                    </>
                )}
            </div>
        );
    }
}

export default Training;
