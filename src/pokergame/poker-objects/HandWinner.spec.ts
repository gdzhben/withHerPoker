import { ICard, IHand, HandType, SuitType } from "../../interfaces";
import { Card } from "./Card";
import { Hand } from "./Hand";
import { HandClassifier } from './HandClassifier';
import { HandWinner } from './HandWinner';

describe('HandWinner', () => {

    beforeEach(() => {
    });
    describe('gameWinner', () => {

        it('Should return true', () => {
            let testCards1: ICard[] = [];

            testCards1[0] = new Card(SuitType.Clubs, 10);
            testCards1[1] = new Card(SuitType.Diamonds, 10);
            testCards1[2] = new Card(SuitType.Diamonds, 9);
            testCards1[3] = new Card(SuitType.Clubs, 8);
            testCards1[4] = new Card(SuitType.Hearts, 7);
            let testHand1 = new Hand(testCards1);
            let testCards2: ICard[] = [];

            testCards2[0] = new Card(SuitType.Clubs, 2);
            testCards2[1] = new Card(SuitType.Diamonds, 2);
            testCards2[2] = new Card(SuitType.Diamonds, 3);
            testCards2[3] = new Card(SuitType.Clubs, 4);
            testCards2[4] = new Card(SuitType.Hearts, 5);
            let testHand2 = new Hand(testCards2);
            let test = new HandWinner(testHand1, testHand2);
            let result = test.getWinner();
            expect(result).toBe(true);
        });
    });
    describe('gameWinner', () => {

        xit('Should return false.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.Clubs, 2);
            testCards[1] = new Card(SuitType.Diamonds, 2);
            testCards[2] = new Card(SuitType.Diamonds, 3);
            testCards[3] = new Card(SuitType.Clubs, 4);
            testCards[4] = new Card(SuitType.Hearts, 5);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.OnePair);
        });
    });


});