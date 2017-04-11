import { Hand } from "./Hand";
import { Card } from './Card';
import { SuitType } from '../types/SuitType';

describe('Hand', function() {

    let testHand: Hand;
    let testCardArray: Card[];

    beforeEach(() => {
        testCardArray = [];
        testCardArray.push(new Card("K", SuitType.CLUBS, 13));
        testCardArray.push(new Card("3", SuitType.HEARTS, 3));
        testCardArray.push(new Card("5", SuitType.DIAMONDS, 5));
        testCardArray.push(new Card("5", SuitType.DIAMONDS, 5));
        testCardArray.push(new Card("A", SuitType.CLUBS, 14));
        testHand = new Hand(testCardArray);
    });

    describe('size', () => {
        it('it must return 5', () => { 
            let result = testHand.size();
            expect(result).toBe(5);
        });
    });

    describe('sort', () => {
        it ('it must sort the hand', () => {
            testHand.sort();
            let result = testHand.toString();
            expect(result).toBe("3Hearts 5Diamonds 5Diamonds KClubs AClubs ");
        });
    });

    describe('getCard', () => {
        it ('it must return \'5Diamonds\'', () => {
            let result = testHand.getCard(2);
            expect(result.toString()).toBe("5Diamonds");
        });
    });

    describe('discard', () => {
        it ('it must return \'5Diamonds\'', () => {
            let result = testHand.discard(2);
            expect(result.toString()).toBe("5Diamonds");
            expect(testHand.size()).toBe(4);
        });
    });

    describe('receiveCard', () => {
        it ('it must return NOTHING, but hand should contain the new card', () => {
            testHand.discard(3);
            let newCard: Card = new Card("4", SuitType.HEARTS, 4);
            testHand.receiveCard(newCard);
            expect(testHand.getCard(1).toString()).toBe("4Hearts");
        });
    });

    describe('discardCount', () => {
        it ('it must return 2', () => {
            testHand.discard(3);
            testHand.discard(1);
            expect(testHand.getDiscardedCount()).toBe(2);
        });
    });

});