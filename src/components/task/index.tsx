import React from 'react';

import {TASK_TYPES} from '../../constants';
import {TaskSettings} from "./types";
import StatisticModel from '../../models/statistic-model';

import BaseTaskModel from './models/base-task-model';
import AddictionTaskModel from './models/addiction-task-model';
import SubtractionTaskModel from './models/subtraction-task-model';
import ComparisonTaskModel from './models/comparison-task-model';

import StorageModel from '../../models/storage-model';

import BaseTaskCompenent from './components/base-task'

type Props = {
    taskType: string;
    statisticModel: StatisticModel;
    baseLevel: number;
    onIncreaseScore: (score?: number) => void;
}

type State = {
    taskType: string;
    // taskModel: BaseTaskModel;
}

class Task extends React.Component<Props, State> {
    _statisticModel: StorageModel;
    // _taskComponent: BaseTaskCompenent;
    _taskStatistic: any;
    _taskModel: BaseTaskModel;

    constructor(props: Props) {
        super(props);
        this.state = {
            taskType: props.taskType,
            // taskModel: this.createaskModel(props.taskType),
        };
        this._statisticModel = new StorageModel();
        // this._taskComponent = this.getTaskComponent();
        this._taskStatistic = this._statisticModel.get(props.taskType);
        this._taskModel = this.createaskModel(props.taskType);
    }

    /*getTaskComponent(): BaseTaskCompenent {
        let taskStatistic: any = this._statisticModel.get(this.props.taskType);
        let taskModel: BaseTaskModel = this.createaskModel(this.props.taskType);
        let taskComponent: BaseTaskCompenent =
            <BaseTaskCompenent
                taskModel={taskModel}
                settings={taskStatistic}
                onIncreaseScore={(score?: number) => this.props.onIncreaseScore(score)}
                onNextTask={() => this.props.onNextTask()}
            />;
        return taskComponent;
    }*/

    onUpdateStatistic(statisticIncrement: any): void {
        // this._statisticModel.increase(this.props.taskType, statisticIncrement);
    }

    createaskModel(taskType: string): BaseTaskModel {
        let taskModel: BaseTaskModel;
        let settings: TaskSettings = {
            baseLevel: this.props.baseLevel,
            totalScore: this.props.statisticModel.getTotalScore(),
        };
        switch (taskType) {
            case TASK_TYPES.ADDICTION:
                taskModel = new AddictionTaskModel(settings);
                break;
            case TASK_TYPES.SUBTRACTION:
                taskModel = new SubtractionTaskModel(settings);
                break;
            case TASK_TYPES.COMPARISON:
                taskModel = new ComparisonTaskModel(settings);
                break;
            default:
                taskModel = new AddictionTaskModel(settings);
                break;
        }
        return taskModel;
    }

    render() {
        return <>
            <BaseTaskCompenent
                taskModel={this._taskModel}
                onIncreaseScore={(score?: number) => this.props.onIncreaseScore(score)}
            />
        </>;
    }
}

export default Task;
