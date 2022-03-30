import BaseTask from './base-task';
import {TaskSettings} from '../../types';

class SubtractionTask extends BaseTask {
    init(settings: TaskSettings) {
        super.init(settings);

        if (Number(this.getAnswer()) < 0) {
            this.swapOperands();
        }
    }

    getExerciseBefore(): string {
        return this.getLeftOperand() + ' - ' + this.getRightOperand() + ' = ';
    }

    getAnswer() {
        return String(Number(this.getLeftOperand()) - Number(this.getRightOperand()));
    }

}

export default SubtractionTask;
