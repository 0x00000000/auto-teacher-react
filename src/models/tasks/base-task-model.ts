import {TaskSettings} from '../../types';

type OperatorsSettings = {
    leftOperandMin?: number;
    leftOperandMax?: number;
    rightOperandMin?: number;
    rightOperandMax?: number;
};

class BaseTaskModel {
    _leftOperand?: number;
    _rightOperand?: number;
    _settings?: OperatorsSettings;
    _type: string = '';

    getTotalScoreDevideCoof(): number {
        return 50;
    }

    getBaseLevelMultipleCoof(): number {
        return 1;
    }

    constructor(settings: TaskSettings) {
        this.initSettings(settings);
    }

    init() {
        this._leftOperand = this.getOperatorValue(this._settings?.leftOperandMin, this._settings?.leftOperandMax);
        this._rightOperand = this.getOperatorValue(this._settings?.leftOperandMin, this._settings?.rightOperandMax);
    }

    initSettings(settings: TaskSettings) {
        const operatorMax: number = this.getMaxOperator(settings);
        this._settings = {};
        this._settings.leftOperandMin = Math.floor(operatorMax / 2);
        this._settings.leftOperandMax = operatorMax ?? 5;
        this._settings.rightOperandMin = Math.floor(operatorMax / 2);
        this._settings.rightOperandMax = operatorMax ?? 5;
    }

    getExercisePartsList(): Array<string> {
        return [];
    }

    getAnswersList(): Array<string> {
        return [];
    }

    getAnswersCount(): number {
        return this.getAnswersList().length;
    }

    checkAnswersList(answersList: Array<string>): boolean {
        const isCorrect = this.getAnswersList().reduce(
            (previousValue, currentValue, currentIndex) => previousValue && (currentValue === answersList[currentIndex]),
            true
        );
        return isCorrect;
    }

    getAnswerCasesList(): Array<string> {
        let to: number = this.getMax(this?._settings?.leftOperandMax, this?._settings?.rightOperandMax);
        return this.getCasesRange(0, to);
    }

    getType(): string {
        return this._type;
    }

    getOperatorValue(min?: number, max?: number) {
        return Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);
    }

    getMaxOperator(settings: TaskSettings): number {
        let baseValue: number = settings.baseLevel * this.getBaseLevelMultipleCoof();
        let increaseValue: number = settings.totalScore / this.getTotalScoreDevideCoof();

        return Math.floor(baseValue + increaseValue)
    }

    getLeftOperand(): string {
        return String(this._leftOperand);
    }

    getRightOperand(): string {
        return String(this._rightOperand);
    }

    swapOperands(): void {
        let temp: number = Number(this._leftOperand);
        this._leftOperand = this._rightOperand;
        this._rightOperand = temp;
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

export default BaseTaskModel;

