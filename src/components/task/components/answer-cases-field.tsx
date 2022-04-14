import React from 'react';

type Props = {
    casesList: Array<string>;
    onAddAnswer: (answer: string) => void;
};

class AnswerCasesField extends React.Component<Props> {
    render() {
        return (
            <div className="task-answer-cases">
                {this.props.casesList.map<React.ReactNode>(
                    (value, key) => <span key={key} onClick={(event: any) => this.props.onAddAnswer(event.target.innerText)}>{value}</span>
                )}
            </div>
        );
    };
}

export default AnswerCasesField;
