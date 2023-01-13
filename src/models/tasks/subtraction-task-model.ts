import BaseTaskModel from './base-task-model';
import {TASK_TYPES} from '../../constants';

class SubtractionTaskModel extends BaseTaskModel {
    public initTask() {
        super.initTask();
        this._type = TASK_TYPES.SUBTRACTION;

        if (Number(this._leftOperand) < Number(this._rightOperand)) {
            this.swapOperands();
        }
    }

    public getExercisePartsList(): Array<string> {
        return [
            this.getLeftOperand() + ' - ' + this.getRightOperand() + ' = ',
        ];
    }

    public getAnswersList(): Array<string> {
        return [String(Number(this.getLeftOperand()) - Number(this.getRightOperand()))];
    }
}

export default SubtractionTaskModel;
