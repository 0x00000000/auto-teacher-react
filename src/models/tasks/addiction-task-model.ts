import BaseTaskModel from './base-task-model';
import {TASK_TYPES} from "../../constants";

class AddictionTaskModel extends BaseTaskModel {
    public initTask() {
        super.initTask();
        this._type = TASK_TYPES.ADDICTION;
    }

    public getExercisePartsList(): Array<string> {
        return [
            this.getLeftOperand() +  ' + ' + this.getRightOperand() + ' = ',
        ];
    }

    public getAnswersList(): Array<string> {
        return [String(Number(this.getLeftOperand()) + Number(this.getRightOperand()))];
    }

    public getAnswerCasesList(): Array<string> {
        let to: number = Number(this?._settings?.leftOperandMax) + Number(this?._settings?.rightOperandMax);
        return this.getCasesRange(0, to);
    }
}

export default AddictionTaskModel;
