import BaseTaskModel from './base-task-model';
import {TASK_TYPES} from '../../../constants';

class SubtractionTaskModel extends BaseTaskModel {
    init() {
        super.init();
        this._type = TASK_TYPES.SUBTRACTION;

        if (Number(this.getAnswersList()[0]) < 0) {
            this.swapOperands();
        }
    }

    getExercisePartsList(): Array<string> {
        return [
            this.getLeftOperand() + ' - ' + this.getRightOperand() + ' = ',
        ];
    }

    getAnswersList(): Array<string> {
        return [String(Number(this.getLeftOperand()) - Number(this.getRightOperand()))];
    }

}

export default SubtractionTaskModel;
