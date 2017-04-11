import { Hand } from "./Hand";
import { Card } from './Card';
import { SuitType } from '../types/SuitType';

describe('Test', function() {

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
            expect(result).toBe("AC KC 5D 5D 3H ");
        });
    });

    describe('getCard', () => {
        it ('it must return \'5D\'', () => {
            let result = testHand.getCard(3);
            expect(result.toString()).toBe("5D");
        });
    });

    describe('discard', () => {
        it ('it must return \'5D\'', () => {
            let result = testHand.discard(3);
            expect(result.toString()).toBe("5D");
            expect(testHand.size()).toBe(4);
        });
    });

    describe('receiveCard', () => {
        it ('it must return NOTHING, but hand should contain the new card', () => {
            testHand.discard(3);
            let newCard: Card = new Card("9", SuitType.HEARTS, 9);
            testHand.receiveCard(newCard);
            expect(testHand.getCard(4).toString()).toBe("9H");
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