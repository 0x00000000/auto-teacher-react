import BaseTask from './base-task'

class AddictionTask extends BaseTask {

    getExerciseBefore(): string {
        return this.getLeftOperand() +  ' + ' + this.getRightOperand() + ' = ';
    }

    getAnswer(): string {
        return String(Number(this.getLeftOperand()) + Number(this.getRightOperand()));
    }

    getAnswerCases(): Array<string> {
        let to: number = Number(this?._settings?.leftOperandMax) + Number(this?._settings?.rightOperandMax);
        return this.getCasesRange(0, to);
    }

}

export default AddictionTask;

