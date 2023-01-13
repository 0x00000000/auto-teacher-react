import BaseTaskModel from './base-task-model';
import {TASK_TYPES} from "../../constants";

class ComparisonTaskModel extends BaseTaskModel {
    public initTask() {
        super.initTask();
        this._type = TASK_TYPES.COMPARISON;
    }

    public getExercisePartsList(): Array<string> {
        return [
            this.getLeftOperand() + ' ',
            ' ' + this.getRightOperand(),
        ];
    }

    public getAnswersList(): Array<string> {
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

    public getAnswerCasesList(): Array<string> {
        return ['<', '=', '>',];
    }

    protected getTotalScoreDevideCoof(): number {
        return 10;
    }

    protected getBaseLevelMultipleCoof(): number {
        return 10;
    }
}

export default ComparisonTaskModel;
