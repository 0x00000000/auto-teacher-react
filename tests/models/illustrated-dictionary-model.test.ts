import IllustratedDictionaryModel from '../../src/models/illustrated-dictionary-model';
import { IllustratedDictionaryItem } from '../../src/types';
describe('IllustratedDictionaryModel', () => {
    let dictionary: IllustratedDictionaryModel = new IllustratedDictionaryModel();

    beforeEach(() => {
        dictionary = new IllustratedDictionaryModel();
    });

    test('Check get items', () => {
        let items: Array<IllustratedDictionaryItem> = dictionary.getRandomItems(7);
        expect(items.length).toBe(7);
        expect(items[0].text).toBeTruthy();
        expect(items[0].image).toBeTruthy();
        expect(items[1].text).toBeTruthy();
        expect(items[1].image).toBeTruthy();
    });

    test('Check get 0 items', () => {
        let items: Array<IllustratedDictionaryItem> = dictionary.getRandomItems(0);
        expect(items).toEqual([]);
    });

    test('Check get too many items', () => {
        let items: Array<IllustratedDictionaryItem> = dictionary.getRandomItems(1000000);
        expect(items.length).toBeTruthy();
        expect(items[0].text).toBeTruthy();
        expect(items[0].image).toBeTruthy();
        expect(items[1].text).toBeTruthy();
        expect(items[1].image).toBeTruthy();
    });
});
