import React from 'react';

import {TaskSettings, TASK_TYPE_ADDICTION, TASK_TYPE_SUBTRACTION, TASK_TYPE_COMPARISON} from '../types'
import AddictionTask from "../models/tasks/addiction-task";
import SubtractionTask from "../models/tasks/subtraction-task";
import ComparisonTask from "../models/tasks/comparison-task";
import BaseTask from "../models/tasks/base-task";

import Task from './task';

type Props = {
    tasksDefaultType: string,
};

type State = {
    totalScore: number;
    tasksCounter: number;
    tasksType: string;
    readyToFinish: boolean;
};

class Training extends React.Component<Props, State> {

    private _taskSettings: TaskSettings;
    private _task: BaseTask;

    constructor(props: Props) {
        super(props);
        this.state = {
            totalScore: 0,
            tasksCounter: 0,
            tasksType: props.tasksDefaultType,
            readyToFinish: false,
        };
        this._taskSettings = this.getSettings(props.tasksDefaultType);
        this._task = this.getTask(props.tasksDefaultType);
        this._task.init(this._taskSettings);
    }

    setType(type?: string): void {
        if (type) {
            this._taskSettings = this.getSettings(type);
            this._task = this.getTask(type);
            this._task.init(this._taskSettings);

            this.setState(state => ({
                ...state,
                totalScore: 0,
                tasksCounter: 1,
                tasksType: type,
                readyToFinish: false,
            }));
        }
    }

    getSettings(type?: string): TaskSettings {
        let settings: TaskSettings;
        if (type === TASK_TYPE_ADDICTION) {
            settings = {
                leftOperandMin: 0,
                leftOperandMax: 7,
                rightOperandMin: 0,
                rightOperandMax: 7,
            };
        } else if (type === TASK_TYPE_SUBTRACTION) {
            settings = {
                leftOperandMin: 0,
                leftOperandMax: 7,
                rightOperandMin: 0,
                rightOperandMax: 7,
            };
        } else if (type === TASK_TYPE_COMPARISON) {
            settings = {
                leftOperandMin: 0,
                leftOperandMax: 99,
                rightOperandMin: 0,
                rightOperandMax: 99,
            };
        } else {
            settings = {};
        }
        return settings;
    }

    getTask(type?: string): BaseTask {
        let task: BaseTask;
        if (type === TASK_TYPE_ADDICTION) {
            task = new AddictionTask();
        } else if (type === TASK_TYPE_SUBTRACTION) {
            task = new SubtractionTask();
        } else if (type === TASK_TYPE_COMPARISON) {
            task = new ComparisonTask();
        } else {
            task = new AddictionTask();
        }
        return task;
    }

    onIncreaseScore(score?: number) {
        if (! score) {
            score = 1;
        }
        this.setState(state => ({
            ...state,
            totalScore: this.state.totalScore + Number(score),
            readyToFinish: false,
        }));
    }

    onNextTask() {
        this._task.init(this._taskSettings);
        this.setState(state => ({
            ...state,
            tasksCounter: this.state.tasksCounter + 1,
            readyToFinish: false,
        }));
    }

    onAnswerSelect() {
        this.setState(state => ({
            ...state,
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
            this.setState(state => ({
                totalScore: 0,
                tasksCounter: 0,
                tasksType: this.props.tasksDefaultType,
                readyToFinish: false,
            }));
        }
    }

    render() {
        return (
            <div className="training">
                {! Boolean(this.state.tasksCounter) && (
                    <>
                        <button
                            value={TASK_TYPE_ADDICTION}
                            onClick={(event: any) => this.setType(event.target?.value)}
                        >Addiction</button>
                        <button
                            value={TASK_TYPE_SUBTRACTION}
                            onClick={(event: any) => this.setType(event.target?.value)}
                        >Subtraction</button>
                        <button
                            value={TASK_TYPE_COMPARISON}
                            onClick={(event: any) => this.setType(event.target?.value)}
                        >Comparison</button>
                    </>
                )}
                {Boolean(this.state.tasksCounter) && (
                    <>
                        <button
                            onClick={() => this.finishTraining()}
                        >{Boolean(this.state.readyToFinish) ? "Click one more time to finish" : "Finish training"}</button>
                        <h3>Score: {this.state.totalScore}</h3>
                        <h4>Task number: {this.state.tasksCounter}</h4>
                        <Task
                            task={this._task}
                            settings={this._taskSettings}
                            onIncreaseScore={(score?: number) => this.onIncreaseScore(score)}
                            onNextTask={() => this.onNextTask()}
                            onAnswerSelect={() => this.onAnswerSelect()}
                        />
                    </>
                )}
            </div>
        );
    }
}

export default Training;
