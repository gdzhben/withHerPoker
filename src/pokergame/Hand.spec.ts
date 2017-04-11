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

    describe('size', function() {
        it('it must return 5', () => {
            let result = testHand.size();
            expect(result).toBe(5);
        });
    });

});