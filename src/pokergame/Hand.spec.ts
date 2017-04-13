import { Hand } from "./Hand";
import { ICard } from './ICard';
import { Card } from './Card';
import { SuitType } from '../types/SuitType';

describe('Hand', function () {

    let testHand: Hand;
    let testCardArray: ICard[];

    beforeEach(() => {
        testCardArray = [];
        testCardArray.push(new Card(SuitType.CLUBS, 13));
        testCardArray.push(new Card(SuitType.HEARTS, 3));
        testCardArray.push(new Card(SuitType.DIAMONDS, 6));
        testCardArray.push(new Card(SuitType.DIAMONDS, 5));
        testCardArray.push(new Card(SuitType.DIAMONDS, 10));
        testHand = new Hand(testCardArray);
    });

    describe('size', () => {
        it('it must return 5', () => {
            let result = testHand.size();
            expect(result).toBe(5);
        });
    });

    describe('sort', () => {
        it('it must sort the hand', () => {
            testHand.sort();
            let result = testHand.toString();
            expect(result).toBe("3HEARTS 5DIAMONDS 6DIAMONDS 10DIAMONDS KCLUBS");
        });
    });

    describe('getCard', () => {
        it('it must return properly', () => {
            let result = testHand.getCard(2);
            expect(result.toString()).toBe("6DIAMONDS");
        });
    });

    describe('discard', () => {
        it('it must discard properly', () => {
            let result = testHand.discard(2);
            expect(result.toString()).toBe("6DIAMONDS");
            expect(testHand.size()).toBe(4);
        });
    });

    describe('receiveCard', () => {
        it('it must return NOTHING, but hand should contain the new card', () => {
            testHand.discard(3);
            let newCard: Card = new Card(SuitType.HEARTS, 4);
            testHand.receiveCard(newCard);
            expect(testHand.getCard(1).toString()).toBe("4HEARTS");
        });
    });

    describe('discardCount', () => {
        it('it must return 2', () => {
            testHand.discard(3);
            testHand.discard(1);
            expect(testHand.getDiscardedCount()).toBe(2);
        });
    });

});