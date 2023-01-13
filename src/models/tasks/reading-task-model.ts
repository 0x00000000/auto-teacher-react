import BaseTaskModel from './base-task-model';
import IllustratedDictionaryModel from '../illustrated-dictionary-model';
import { IllustratedDictionaryItem } from '../../types';

import {TASK_TYPES, BASE_URL} from "../../constants";

class ReadingTaskModel extends BaseTaskModel {
    protected _dictionary: IllustratedDictionaryModel = new IllustratedDictionaryModel();
    protected _wordsList: Array<IllustratedDictionaryItem> = [];
    protected _wordsCount: number = 6;
    protected _answerCasesList: Array<string> = [];
    protected _answersList: Array<string> = [];
    protected _exercisePartsList: Array<string> = [];
    protected _imagesUri: string = BASE_URL + 'images/illustrated-distionary/';

    public initTask() {
        super.initTask();
        this._type = TASK_TYPES.READING;
        this._wordsList = this._dictionary.getRandomItems(this._wordsCount);
        let answerKey: number = this.getRandomKey(this._wordsList.length);
        this._answerCasesList = this._wordsList.map((item) => this._imagesUri + item.image);
        this._answersList = [this._imagesUri + this._wordsList[answerKey].image];
        this._exercisePartsList = [this._wordsList[answerKey].text];
    }

    public getExercisePartsList(): Array<string> {
        return this._exercisePartsList;
    }

    public getAnswersList(): Array<string> {
        return this._answersList;
    }

    public getAnswerCasesList(): Array<string> {
        return this._answerCasesList;
    }

    public getRandomKey(arrayLength: number) {
        return Math.floor(Math.random() * (arrayLength));
    }
}

export default ReadingTaskModel;
