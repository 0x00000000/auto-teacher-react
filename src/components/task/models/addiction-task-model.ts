import BaseTaskModel from './base-task-model'
import {TASK_TYPES} from "../../../constants";

class AddictionTaskModel extends BaseTaskModel {

    init() {
        super.init();
        this._type = TASK_TYPES.ADDICTION;
    }

    getExercisePartsList(): Array<string> {
        return [
            this.getLeftOperand() +  ' + ' + this.getRightOperand() + ' = ',
        ];
    }

    getAnswersList(): Array<string> {
        return [String(Number(this.getLeftOperand()) + Number(this.getRightOperand()))];
    }

    getAnswerCasesList(): Array<string> {
        let to: number = Number(this?._settings?.leftOperandMax) + Number(this?._settings?.rightOperandMax);
        return this.getCasesRange(0, to);
    }

}

export default AddictionTaskModel;

