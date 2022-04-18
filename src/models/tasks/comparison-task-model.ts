import BaseTaskModel from './base-task-model';
import {TASK_TYPES} from "../../constants";
import {TaskSettings} from "../../types";

class ComparisonTaskModel extends BaseTaskModel {

    getTotalScoreDevideCoof(): number {
        return 10;
    }

    getBaseLevelMultipleCoof(): number {
        return 10;
    }

    init() {
        super.init();
        this._type = TASK_TYPES.COMPARISON;
    }

    getExercisePartsList(): Array<string> {
        return [
            this.getLeftOperand() + ' ',
            ' ' + this.getRightOperand(),
        ];
    }

    getAnswersList(): Array<string> {
        let result: string = '';
        let diff: number = Number(this.getLeftOperand()) - Number(this.getRightOperand());
        if (diff > 0) {
            result = '>';
        } else if (diff < 0) {
            result = '<';
        } else {
            result = '=';
        }
        return [result];
    }

    getAnswerCasesList(): Array<string> {
        return ['<', '=', '>',];
    }

}

export default ComparisonTaskModel;
