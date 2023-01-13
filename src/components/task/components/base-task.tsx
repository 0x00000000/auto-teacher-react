import React from 'react';

import AnswerCasesField from "./answer-cases-field";

import BaseTaskModel from "../../../models/tasks/base-task-model";

type Props = {
    taskModel: BaseTaskModel;
    onIncreaseScore: (score?: number) => void;
};

type State = {
    exercisePartsList: Array<string>,
    answerCasesList: Array<string>;
    answersList: Array<string>;
    isCorrectAnswer: boolean;
    isAnswerChecked: boolean;
};

class BaseTaskCompenent extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            exercisePartsList: this.props.taskModel.getExercisePartsList(),
            answerCasesList: this.props.taskModel.getAnswerCasesList(),
            answersList: [],
            isCorrectAnswer: false,
            isAnswerChecked: false,
        };
    }

    onAddAnswer(answer: string) {
        this.setState(state => ({
            ...state,
            answersList: [answer],
        }));
    }

    onNextTask() {
        if (! this.state.isAnswerChecked) {
            this.checkAnswer();
        }

        this.props.taskModel.initTask();
        this.setState(state => ({
            ...state,
            exercisePartsList: this.props.taskModel.getExercisePartsList(),
            answerCasesList: this.props.taskModel.getAnswerCasesList(),
            answersList: [''],
            isCorrectAnswer: false,
            isAnswerChecked: false,
        }));
    }

    onAnswerCheck() {
        if (! this.state.isAnswerChecked) {
            this.checkAnswer();
        }

        let isCorrectAnswer: boolean = this.props.taskModel.checkAnswersList(this.state.answersList);
        this.setState(state => ({
            ...state,
            isCorrectAnswer: isCorrectAnswer,
            isAnswerChecked: true,
        }));
    }

    onAnswerClear() {
        this.setState(state => ({
            ...state,
            answersList: [],
        }));
    }

    checkAnswer(): void {
        const isCorrectAnswer: boolean = this.props.taskModel.checkAnswersList(this.state.answersList);
        const scoreToIncrease: number = isCorrectAnswer ? 1 : -1;
        this.props.onIncreaseScore(scoreToIncrease);
    }

    render() {
        return (
            <div className="task-container">
                {this.state.exercisePartsList.map((part, key) => (
                    <span key={key}>
                        {part}
                        <span className="task-answer">{this.state.answersList[key] ?? ''}</span>
                    </span>
                ))}
                <AnswerCasesField
                    casesList={this.state.answerCasesList}
                    onAddAnswer={(answer: string) => this.onAddAnswer(answer)}
                />
                <h3>&nbsp;
                    {Boolean(this.state.isAnswerChecked && this.state.isCorrectAnswer) && (
                        <span className="correct">Correct!</span>
                    )}
                    {Boolean(this.state.isAnswerChecked && ! this.state.isCorrectAnswer) && (
                        <span className="incorrect">Incorrect!</span>
                    )}
                </h3>
                <button
                    onClick={() => this.onAnswerCheck()}
                >Check answer</button>
                <button
                    onClick={() => this.onAnswerClear()}
                >Clear answer</button>
                <button
                    onClick={() => this.onNextTask()}
                >Next task</button>
            </div>
        );
    }
}

export default BaseTaskCompenent;
