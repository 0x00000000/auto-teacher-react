import React from 'react';

import StatisticModel from '../../models/statistic-model';
import BaseTaskModel from '../../models/tasks/base-task-model';

import TaskFactory from "../../classes/task-factory";

import BaseTaskCompenent from './components/base-task'
import ReadingTaskCompenent from './components/reading-task'

import {TASK_TYPES} from '../../constants';

type Props = {
    taskType: string;
    statisticModel: StatisticModel;
    baseLevel: number;
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
        return this._taskFactory.createTask(
            taskType,
            this.props.baseLevel,
            this.props.statisticModel.getTotalScore()
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
