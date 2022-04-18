import React from 'react';

import AnswerCasesImagesField from "./answer-cases-images-field";

import BaseTaskCompenent from './base-task'

class ReadingTaskCompenent extends BaseTaskCompenent {

    render() {
        return (
            <div className="task-container">
                <p className="task-image-answer">
                    {this.state.exercisePartsList.map((part, key) => (
                        <span key={key}>
                            <h2>{part}</h2>
                            <div className="task-image-answer-box">
                                {Boolean(this.state.answersList[key]) && (
                                    <span><img src={this.state.answersList[key]} className="task-image" /></span>
                                )}
                            </div>
                        </span>
                    ))}
                </p>
                <AnswerCasesImagesField
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

export default ReadingTaskCompenent;
