import BaseTaskModel from './base-task-model';
import {TASK_TYPES} from '../../constants';
import {TaskSettings} from "../../types";

class SubtractionReversedTaskModel extends BaseTaskModel {
    _isFirstOperandIsAsked: boolean = false;

    init() {
        super.init();
        this._type = TASK_TYPES.SUBTRACTION_REVERSED;

        if (Number(this._leftOperand) < Number(this._rightOperand)) {
            this.swapOperands();
        }

        this._isFirstOperandIsAsked = Boolean(Math.floor(Math.random() * 2));

        if (this._isFirstOperandIsAsked) {
            // ? - A = B
            const answer = Number(this._leftOperand);
            this._leftOperand = Number(this._rightOperand);
            this._rightOperand = answer - Number(this._leftOperand);

        } else {
            // A - ? = B
            this._rightOperand = Number(this._leftOperand) - Number(this._rightOperand);
        }

    }

    initSettings(settings: TaskSettings) {
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
                ' - ' + this.getLeftOperand() + ' = ' + this.getRightOperand(),
            ];
        } else {
            return [
                this.getLeftOperand() + ' - ',
                ' = ' + this.getRightOperand(),
            ];
        }
    }

    getAnswersList(): Array<string> {
        if (this._isFirstOperandIsAsked) {
            return [String(Number(this.getLeftOperand()) + Number(this.getRightOperand()))];
        } else {
            return [String(Number(this.getLeftOperand()) - Number(this.getRightOperand()))];
        }
    }

}

export default SubtractionReversedTaskModel;
