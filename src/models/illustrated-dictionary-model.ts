import {IllustratedDictionaryItem} from '../types';

class IllustratedDictionaryModel {
    _itemsList: Array<IllustratedDictionaryItem> = [
        {russian: 'утка', image: '1.jpg',},
        {russian: 'гриб', image: '2.jpg',},
        {russian: 'дыня', image: '3.jpg',},
        {russian: 'носки', image: '4.jpg',},
        {russian: 'часы', image: '5.jpg',},
        {russian: 'шар', image: '6.jpg',},
        {russian: 'моряк', image: '7.jpg',},
        {russian: 'окно', image: '8.jpg',},
        {russian: 'хомяк', image: '9.jpg',},
        {russian: 'дом', image: '10.jpg',},
        {russian: 'ласты', image: '11.jpg',},
        {russian: 'пчела', image: '12.jpg',},
        {russian: 'топор', image: '13.jpg',},
        {russian: 'дельфин', image: '14.jpg',},
        {russian: 'кукла', image: '15.jpg',},
        {russian: 'звезда', image: '16.jpg',},
        {russian: 'павлин', image: '17.jpg',},
        {russian: 'зебра', image: '18.jpg',},
        {russian: 'лебедь', image: '19.jpg',},
        {russian: 'тигр', image: '20.jpg',},
        {russian: 'груша', image: '21.jpg',},
        {russian: 'юбка', image: '22.jpg',},
        {russian: 'пингвин', image: '23.jpg',},
        {russian: 'сова', image: '24.jpg',},
        {russian: 'рак', image: '25.jpg',},
        {russian: 'собака', image: '26.jpg',},
        {russian: 'лиса', image: '27.jpg',},
        {russian: 'рыба', image: '28.jpg',},
        {russian: 'жёлудь', image: '29.jpg',},
        {russian: 'заяц', image: '30.jpg',},
        {russian: 'стул', image: '31.jpg',},
        {russian: 'ложка', image: '32.jpg',},
        {russian: 'туфли', image: '33.jpg',},
        {russian: 'кресло', image: '34.jpg',},
        {russian: 'шкаф', image: '35.jpg',},
        {russian: 'киви', image: '36.jpg',},
        {russian: 'лимон', image: '37.jpg',},
        {russian: 'белка', image: '38.jpg',},
        {russian: 'кувшин', image: '39.jpg',},
        {russian: 'лук', image: '40.jpg',},
        {russian: 'лев', image: '41.jpg',},
        {russian: 'вагон', image: '42.jpg',},
        {russian: 'пирог', image: '43.jpg',},
        {russian: 'коза', image: '44.jpg',},
        {russian: 'морж', image: '45.jpg',},
        {russian: 'кот', image: '46.jpg',},
        {russian: 'бык', image: '47.jpg',},
        {russian: 'совок', image: '48.jpg',},
        {russian: 'пила', image: '49.jpg',},
        {russian: 'каша', image: '50.jpg',},
        {russian: 'рука', image: '51.jpg',},
        {russian: 'нога', image: '52.jpg',},
        {russian: 'диван', image: '53.jpg',},
        {russian: 'миксер', image: '54.jpg',},
        {russian: 'ромб', image: '55.jpg',},
        {russian: 'круг', image: '56.jpg',},
        {russian: 'лужа', image: '57.jpg',},
        {russian: 'банан', image: '58.jpg',},
        {russian: 'нос', image: '59.jpg',},
        {russian: 'овал', image: '60.jpg',},
    ];

    getRandomItems(count: number): Array<IllustratedDictionaryItem> {
        if (count > this._itemsList.length)
            return [];

        let itemsKeysList: Array<number> = [];
        for (let i = 0; i < this._itemsList.length; i++) {
            itemsKeysList[i] = i;
        }

        let randomList: Array<IllustratedDictionaryItem> = [];
        let randomKey: number;
        for (let i = 0; i < count; i++) {
            randomKey = this.getRandomKey(itemsKeysList.length);
            randomList.push(this._itemsList[itemsKeysList[randomKey]]);
            itemsKeysList.splice(randomKey, 1);
        }

        return randomList;
    }

    getRandomKey(arrayLength: number) {
        return Math.floor(Math.random() * (arrayLength));
    }

}

export default IllustratedDictionaryModel;
