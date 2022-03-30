import {TaskSettings} from '../../types';

class BaseTask {
    _leftOperand?: number;
    _rightOperand?: number;
    _settings?: TaskSettings;

    init(settings: TaskSettings) {
        this.initSettings(settings);
        this._leftOperand = this.getOperatorValue(settings.leftOperandMin, settings.leftOperandMax);
        this._rightOperand = this.getOperatorValue(settings.leftOperandMin, settings.rightOperandMax);
        this._settings = settings;
    }

    getOperatorValue(min?: number, max?: number) {
        return Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);
    }

    initSettings(settings: TaskSettings) {
        settings.leftOperandMin ??= 0;
        settings.leftOperandMax ??= 10;
        settings.rightOperandMin ??= 0;
        settings.rightOperandMax ??= 10;
    }

    getLeftOperand(): string {
        return String(this._leftOperand);
    }

    getRightOperand(): string {
        return String(this._rightOperand);
    }

    getExerciseBefore(): string {
        return '';
    }

    getExerciseAfter(): string {
        return '';
    }

    getAnswer(): string {
        return '';
    }

    checkAnswer(answer: string): boolean {
        return answer === this.getAnswer();
    }

    swapOperands(): void {
        let temp: number = Number(this._leftOperand);
        this._leftOperand = this._rightOperand;
        this._rightOperand = temp;
    }

    getAnswerCases(): Array<string> {
        let to: number = this.getMax(this?._settings?.leftOperandMax, this?._settings?.rightOperandMax);
        return this.getCasesRange(0, to);
    }

    getMax(value1?: number, value2?: number): number {
        return Number(value1) > Number(value2) ? Number(value1) : Number(value2);
    }

    getCasesRange(from: number, to: number): Array<string> {
        let casesList: Array<string> = [];
        for (let i: number = from; i <= to; i++) {
            casesList.push(String(i));
        }
        return casesList;
    }
}

export default BaseTask;

