import BaseTask from './base-task';

class ComparisonTask extends BaseTask {
    getExerciseBefore(): string {
        return this.getLeftOperand() + ' ';
    }

    getExerciseAfter(): string {
        return ' ' + this.getRightOperand();
    }

    getAnswer(): string {
        let result: string = '';
        let diff: number = Number(this.getLeftOperand()) - Number(this.getRightOperand());
        if (diff > 0) {
            result = '>';
        } else if (diff < 0) {
            result = '<';
        } else {
            result = '=';
        }
        return result;
    }

    getAnswerCases(): Array<string> {
        return ['<', '>', '=',];
    }

}

export default ComparisonTask;
