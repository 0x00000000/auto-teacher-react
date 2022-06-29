import BaseTaskModel from './base-task-model';
import {TASK_TYPES} from "../../constants";
import {TaskSettingsType} from "../../types";

class AddictionReversedTaskModel extends BaseTaskModel {
    _isFirstOperandIsAsked: boolean = false;

    init() {
        super.init();
        this._type = TASK_TYPES.ADDICTION_REVERSED;

        this._isFirstOperandIsAsked = Boolean(Math.floor(Math.random() * 2));
        this._rightOperand = Number(this._leftOperand) + Number(this._rightOperand);
    }

    initSettings(settings: TaskSettingsType) {
        const operatorMax: number = this.getMaxOperator(settings);
        this._settings = {};
        this._settings.leftOperandMin = 0;
        this._settings.leftOperandMax = Math.floor((operatorMax ?? 5) * 0.7);
        this._settings.rightOperandMin = 0;
        this._settings.rightOperandMax = Math.floor((operatorMax ?? 5) * 0.7);
    }

    getExercisePartsList(): Array<string> {
        if (this._isFirstOperandIsAsked) {
            return [
                '',
                ' + ' + this.getLeftOperand() + ' = ' + this.getRightOperand(),
            ];
        } else {
            return [
                this.getLeftOperand() +  ' + ',
                ' = ' + this.getRightOperand(),
            ];
        }
    }

    getAnswersList(): Array<string> {
        return [String(Number(this.getRightOperand()) - Number(this.getLeftOperand()))];
    }

    getAnswerCasesList(): Array<string> {
        let to: number = Math.max(Number(this?._settings?.rightOperandMax), Number(this?._settings?.leftOperandMax));
        return this.getCasesRange(0, to);
    }

}

export default AddictionReversedTaskModel;

