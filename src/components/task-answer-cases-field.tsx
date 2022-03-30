import React from 'react';

type Props = {
    casesList: Array<string>;
    onAnswerSelected: (event: any) => void;
};

class TaskAnswerCasesField extends React.Component<Props> {
    render() {
        return (
            <div className="task-answer-cases">
                {this.props.casesList.map<React.ReactNode>(
                    t => <span onClick={(event: any) => this.props.onAnswerSelected(event)}>{t}</span>
                )}
            </div>
        );
    };
}

export default TaskAnswerCasesField;
