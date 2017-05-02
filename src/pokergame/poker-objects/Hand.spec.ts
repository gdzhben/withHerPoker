import { SuitType, ICard } from '../../interfaces';

import { Hand } from "./Hand";
import { HandTool } from './HandTool';
import { Card } from './Card';

describe('Hand', function () {

    let testHand: Hand;
    let testCardArray: ICard[];

    beforeEach(() => {
        testCardArray = [];
        testCardArray.push(new Card(SuitType.Clubs, 13));
        testCardArray.push(new Card(SuitType.Hearts, 3));
        testCardArray.push(new Card(SuitType.Diamonds, 6));
        testCardArray.push(new Card(SuitType.Diamonds, 5));
        testCardArray.push(new Card(SuitType.Diamonds, 10));
        testHand = new Hand(testCardArray, new HandTool());
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
            expect(result).toBe("3 of Hearts, 5 of Diamonds, 6 of Diamonds, 10 of Diamonds, K of Clubs");
        });
    });

    describe('getCard', () => {
        it('it must return properly', () => {
            let result = testHand.getCard(2);

            expect(result.toString()).toBe("6 of Diamonds");
        });
    });

    describe('receiveCard', () => {
        it('it must return discarded card, but hand should contain the new card', () => {
            let newCard: Card = new Card(SuitType.Hearts, 4);

            let card = testHand.discardAndReceive(3, newCard);

            expect(card.toShortString()).toBe('10D');
            expect(testHand.getCard(1).toString()).toBe('4 of Hearts');
        });
    });

    describe('discardCount', () => {
        it('it must return 2', () => {
            let newCard: Card = new Card(SuitType.Hearts, 4);

            let card = testHand.discardAndReceive(3, newCard);

            expect(card.toShortString()).toBe('10D');
            expect(testHand.getDiscardedCount()).toBe(1);
        });
    });

    describe('toString', () => {
        it('it must return the list of cards in hand', () => {
            let result = testHand.toString();
            expect(result).toBe("3 of Hearts, 5 of Diamonds, 6 of Diamonds, 10 of Diamonds, K of Clubs");
        });
    });
});