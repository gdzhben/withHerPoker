import { Card } from "./Card";
import { SuitType } from '../../interfaces';

describe('Card', () => {

    let test: Card;
    let testSuit = SuitType.Clubs;
    let testFace = 13;

    beforeEach(() => {
        test = new Card(testSuit, testFace);
    });

    describe('getCardType', () => {

        it('must return card type', () => {
            let result = test.getCardType();

            expect(result).toBe('K');
        });
    });

    describe('getSuitType', () => {

        it('must return suit type', () => {
            let result = test.getSuitType();

            expect(result).toBe(SuitType.Clubs);
        });
    });

    describe('toString', () => {

        it('it must return the full string format of the card', () => {
            let result = test.toString();

            expect(result).toBe('K of Clubs');
        });
    });

    describe('toShortString', () => {

        it('it must return the card short form', () => {
            let result = test.toShortString();

            expect(result).toBe('KC');
        });
    });

    describe('equals', () => {

        it('when args is string and is equal should return true', () => {
            let otherCard = 'kc';

            let result = test.equals(otherCard);

            expect(result).toBeTruthy();
        });

        it('when args is string and is not equal should return false', () => {
            let otherCard = 'KD';

            let result = test.equals(otherCard);

            expect(result).toBeFalsy();
        });

        it('when args is card and is equal should return true', () => {
            let otherCard = new Card(testSuit, testFace);

            let result = test.equals(otherCard);

            expect(result).toBeTruthy();
        });

        it('when args is card and is not equal should return false', () => {
            let otherCard = new Card(testSuit, 11);

            let result = test.equals(otherCard);

            expect(result).toBeFalsy();
        });
    });
});