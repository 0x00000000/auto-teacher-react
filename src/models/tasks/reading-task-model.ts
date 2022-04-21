import BaseTaskModel from './base-task-model';
import IllustratedDictionaryModel from '../illustrated-dictionary-model';
import {IllustratedDictionaryItem, TaskSettings} from '../../types';

import {TASK_TYPES, BASE_URL} from "../../constants";

class ReadingTaskModel extends BaseTaskModel {
    _dictionary: IllustratedDictionaryModel = new IllustratedDictionaryModel();
    _wordsList: Array<IllustratedDictionaryItem> = [];
    _wordsCount: number = 6;
    _answerCasesList: Array<string> = [];
    _answersList: Array<string> = [];
    _exercisePartsList: Array<string> = [];
    _imagesUri: string = BASE_URL + 'images/illustrated-distionary/';

    init() {
        super.init();
        this._type = TASK_TYPES.READING;
        this._wordsList = this._dictionary.getRandomItems(this._wordsCount);
        let answerKey: number = this.getRandomKey(this._wordsList.length);
        this._answerCasesList = this._wordsList.map((item) => this._imagesUri + item.image);
        this._answersList = [this._imagesUri + this._wordsList[answerKey].image];
        this._exercisePartsList = [this._wordsList[answerKey].russian];
    }

    getExercisePartsList(): Array<string> {
        return this._exercisePartsList;
    }

    getAnswersList(): Array<string> {
        return this._answersList;
    }

    getAnswerCasesList(): Array<string> {
        return this._answerCasesList;
    }

    getRandomKey(arrayLength: number) {
        return Math.floor(Math.random() * (arrayLength));
    }

}

export default ReadingTaskModel;

