import { Card } from "./Card";
import { SuitType } from '../types/SuitType';

describe('Card', () => {

    let test: Card;
    let testSuit = SuitType.CLUBS;
    let testFace = 13;

    beforeEach(() => {
        test = new Card(testSuit, testFace);
    });

    describe('getCardType', () => {

        it('must return K', () => {
            let result = test.getCardType();

            expect(result).toBe('K');
        });
    });

    describe('getSuitType', () => {

        it('must return CLUBS', () => {
            let result = test.getSuitType();

            expect(result).toBe(SuitType.CLUBS);
        });
    });

    describe('getFaceValue', () => {

        it('it must return 13', () => {
            let result = test.getFaceValue();

            expect(result).toBe(13);
        });
    });
});