import { Card } from "./Card";
import { SuitType } from '../types/SuitType';

describe('Card', () => {

    let test: Card;
    let testSuit = SuitType.CLUBS;
    let testStr = "testing";
    let testFace = 13;

    beforeEach(() => {
        test = new Card(testStr, testSuit, testFace);
    });

    describe('getCardName', () => {

        it('it must return testing', () => {
            let result = test.getCardName();

            expect(result).toBe('testing');
        });
    });

    describe('getSuitType', () => {

        it('it must return hello', () => {
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