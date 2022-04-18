import React from 'react';

type Props = {
    casesList: Array<string>;
    onAddAnswer: (answer: string) => void;
};

class AnswerCasesImagesField extends React.Component<Props> {
    render() {
        return (
            <div className="task-answer-image-cases">
                {this.props.casesList.map<React.ReactNode>(
                    (value, key) => <span key={key} onClick={
                        (event: any) => this.props.onAddAnswer(value)
                    }>
                        <img src={value} className="task-image" />
                    </span>
                )}
            </div>
        );
    };
}

export default AnswerCasesImagesField;
