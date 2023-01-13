import {TaskSettingsType} from '../../types';

type OperatorsSettings = {
    leftOperandMin?: number;
    leftOperandMax?: number;
    rightOperandMin?: number;
    rightOperandMax?: number;
};

class BaseTaskModel {
    protected _leftOperand?: number;
    protected _rightOperand?: number;
    protected _settings?: OperatorsSettings;
    protected _type: string = '';

    constructor(settings: TaskSettingsType) {
        this.initSettings(settings);
    }

    public initTask() {
        this._leftOperand = this.getOperatorValue(this._settings?.leftOperandMin, this._settings?.leftOperandMax);
        this._rightOperand = this.getOperatorValue(this._settings?.leftOperandMin, this._settings?.rightOperandMax);
    }

    public getType(): string {
        return this._type;
    }

    public getExercisePartsList(): Array<string> {
        return [];
    }

    public getAnswersList(): Array<string> {
        return [];
    }

    public checkAnswersList(answersList: Array<string>): boolean {
        const isCorrect = this.getAnswersList().reduce(
            (previousValue, currentValue, currentIndex) => previousValue && (currentValue === answersList[currentIndex]),
            true
        );
        return isCorrect;
    }

    public getAnswerCasesList(): Array<string> {
        let to: number = this.getMax(this?._settings?.leftOperandMax, this?._settings?.rightOperandMax);
        return this.getCasesRange(0, to);
    }

    protected initSettings(settings: TaskSettingsType) {
        let operatorMax: number = this.getMaxOperator(settings);
        this._settings = {};
        this._settings.leftOperandMin = Math.floor(operatorMax / 2);
        this._settings.leftOperandMax = operatorMax ?? 5;
        this._settings.rightOperandMin = Math.floor(operatorMax / 2);
        this._settings.rightOperandMax = operatorMax ?? 5;
    }

    protected getTotalScoreDevideCoof(): number {
        return 50;
    }

    protected getBaseLevelMultipleCoof(): number {
        return 1;
    }

    protected getOperatorValue(min?: number, max?: number) {
        return Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);
    }

    protected getMaxOperator(settings: TaskSettingsType): number {
        const baseValue: number = settings.baseLevel * this.getBaseLevelMultipleCoof();
        let increaseValue: number = settings.totalScore / this.getTotalScoreDevideCoof();

        let operatorMax: number = Math.floor(baseValue + increaseValue);
        if (settings.maxLevel > 0 && operatorMax > settings.maxLevel) {
            operatorMax = settings.maxLevel;
        }

        return operatorMax;
    }

    protected getLeftOperand(): string {
        return String(this._leftOperand);
    }

    protected getRightOperand(): string {
        return String(this._rightOperand);
    }

    protected swapOperands(): void {
        let temp: number = Number(this._leftOperand);
        this._leftOperand = this._rightOperand;
        this._rightOperand = temp;
    }

    protected getMax(value1?: number, value2?: number): number {
        return Number(value1) > Number(value2) ? Number(value1) : Number(value2);
    }

    protected getCasesRange(from: number, to: number): Array<string> {
        let casesList: Array<string> = [];
        for (let i: number = from; i <= to; i++) {
            casesList.push(String(i));
        }
        return casesList;
    }
}

export default BaseTaskModel;
