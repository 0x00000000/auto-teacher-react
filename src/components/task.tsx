import React, {useState} from 'react';

import {TASK_TYPE_ADDICTION, TaskSettings} from '../types'

import TaskAnswerCasesField from "./task-answer-cases-field"

import BaseTask from "../models/tasks/base-task";

type Props = {
    task: BaseTask;
    settings: TaskSettings;
    onIncreaseScore: (score?: number) => void;
    onNextTask: () => void;
    onAnswerSelect: () => void;
};

type State = {
    taskAnswer: string;
    scoreFirstTry: number;
    isCorrectAnswer: boolean;
};

class Task extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            taskAnswer: '',
            scoreFirstTry: 0,
            isCorrectAnswer: false,
        };
    }

    onAnswerSelected(event: any) {
        let taskAnswer: string = event.target.innerText;
        let isCorrectAnswer: boolean = this.props.task.checkAnswer(taskAnswer);
        let scoreFirstTry: number;
        if (this.state.scoreFirstTry) {
            scoreFirstTry = this.state.scoreFirstTry;
        } else {
            scoreFirstTry = isCorrectAnswer ? 1 : -1;
        }
        this.setState(state => ({
            ...this.state,
            taskAnswer: taskAnswer,
            scoreFirstTry: scoreFirstTry,
            isCorrectAnswer: isCorrectAnswer,
        }));
        this.props.onAnswerSelect();
    }

    goToNextTask() {
        this.props.onIncreaseScore(this.state.scoreFirstTry);
        this.props.onNextTask();
        this.setState(state => ({
            ...this.state,
            taskAnswer: '',
            scoreFirstTry: 0,
            isCorrectAnswer: false,
        }));
    }

    render() {
        return (
            <div className="task-container">
                {this.props.task.getExerciseBefore()}
                <span className="task-answer">{this.state.taskAnswer}</span>
                {this.props.task.getExerciseAfter()}
                <TaskAnswerCasesField
                    casesList={this.props.task.getAnswerCases()}
                    onAnswerSelected={(event: any) => this.onAnswerSelected(event)}
                />
                <h3>&nbsp;
                    {Boolean(this.state.scoreFirstTry && this.state.isCorrectAnswer) && (
                        <span className="correct">Correct!</span>
                    )}
                    {Boolean(this.state.scoreFirstTry && ! this.state.isCorrectAnswer) && (
                        <span className="incorrect">Incorrect!</span>
                    )}
                </h3>
                <button
                    onClick={() => this.goToNextTask()}
                >Next task</button>
            </div>
        );

    }

}

export default Task;
