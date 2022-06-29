import React from 'react';

import StatisticModel from '../../models/statistic-model';
import SettingsModel from '../../models/settings-model';
import BaseTaskModel from '../../models/tasks/base-task-model';

import TaskFactory from "../../classes/task-factory";
import { TaskSettingsType } from "../../types";

import BaseTaskCompenent from './components/base-task'
import ReadingTaskCompenent from './components/reading-task'

import {TASK_TYPES} from '../../constants';

type Props = {
    taskType: string;
    statisticModel: StatisticModel;
    settingsModel: SettingsModel;
    onIncreaseScore: (score?: number) => void;
}

type State = {
    taskType: string;
}

class Task extends React.Component<Props, State> {
    _taskModel: BaseTaskModel;
    _taskFactory: TaskFactory = new TaskFactory();

    constructor(props: Props) {
        super(props);
        this.state = {
            taskType: props.taskType,
        };
        this._taskModel = this.createTaskModel(props.taskType);
    }

    createTaskModel(taskType: string): BaseTaskModel {
        let settings: TaskSettingsType = {
            baseLevel: Number(this.props.settingsModel.getChildBaseLevel()),
            maxLevel: Number(this.props.settingsModel.getTaskSetting(taskType, 'maxLevel')),
            totalScore: this.props.statisticModel.getTotalScore(),
        };
        return this._taskFactory.createTask(
            taskType,
            settings
        );
    }

    render() {
        return <>
            {this.state.taskType === TASK_TYPES.READING && (
                <ReadingTaskCompenent
                    taskModel={this._taskModel}
                    onIncreaseScore={(score?: number) => this.props.onIncreaseScore(score)}
                />
            )}
            {this.state.taskType !== TASK_TYPES.READING && (
                <BaseTaskCompenent
                    taskModel={this._taskModel}
                    onIncreaseScore={(score?: number) => this.props.onIncreaseScore(score)}
                />
            )}
        </>;
    }
}

export default Task;
