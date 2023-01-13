import BaseTaskModel from './base-task-model';
import {TASK_TYPES} from "../../constants";
import {TaskSettingsType} from "../../types";

class AddictionReversedTaskModel extends BaseTaskModel {
    protected _isFirstOperandIsAsked: boolean = false;

    public initTask() {
        super.initTask();
        this._type = TASK_TYPES.ADDICTION_REVERSED;

        this._isFirstOperandIsAsked = Boolean(Math.floor(Math.random() * 2));
        this._rightOperand = Number(this._leftOperand) + Number(this._rightOperand);
    }

    public getExercisePartsList(): Array<string> {
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

    public getAnswersList(): Array<string> {
        return [String(Number(this.getRightOperand()) - Number(this.getLeftOperand()))];
    }

    public getAnswerCasesList(): Array<string> {
        let to: number = Math.max(Number(this?._settings?.rightOperandMax), Number(this?._settings?.leftOperandMax));
        return this.getCasesRange(0, to);
    }

    protected initSettings(settings: TaskSettingsType) {
        const operatorMax: number = this.getMaxOperator(settings);
        this._settings = {};
        this._settings.leftOperandMin = 0;
        this._settings.leftOperandMax = Math.floor((operatorMax ?? 5) * 0.7);
        this._settings.rightOperandMin = 0;
        this._settings.rightOperandMax = Math.floor((operatorMax ?? 5) * 0.7);
    }
}

export default AddictionReversedTaskModel;
