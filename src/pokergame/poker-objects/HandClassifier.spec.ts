import { ICard, IHand, HandType, SuitType } from "../../interfaces";
import { Card } from "./Card";
import { Hand } from "./Hand";
import { HandClassifier } from './HandClassifier';

describe('HandClassifier', () => {

    beforeEach(() => {
    });
    describe('getTypeOfHand', () => {

        it('Should return twopair.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.Clubs, 2);
            testCards[1] = new Card(SuitType.Diamonds, 2);
            testCards[2] = new Card(SuitType.Diamonds, 3);
            testCards[3] = new Card(SuitType.Clubs, 4);
            testCards[4] = new Card(SuitType.Hearts, 4);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.TwoPairs);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return onepair.', () => {
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
    describe('getTypeOfHand', () => {

        it('Should return flush.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.Diamonds, 2);
            testCards[1] = new Card(SuitType.Diamonds, 7);
            testCards[2] = new Card(SuitType.Diamonds, 4);
            testCards[3] = new Card(SuitType.Diamonds, 5);
            testCards[4] = new Card(SuitType.Diamonds, 6);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.Flush);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return royal flush.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.Diamonds, 1);
            testCards[1] = new Card(SuitType.Diamonds, 10);
            testCards[2] = new Card(SuitType.Diamonds, 11);
            testCards[3] = new Card(SuitType.Diamonds, 12);
            testCards[4] = new Card(SuitType.Diamonds, 13);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.RoyalFlush);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return stright flush.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.Diamonds, 2);
            testCards[1] = new Card(SuitType.Diamonds, 3);
            testCards[2] = new Card(SuitType.Diamonds, 4);
            testCards[3] = new Card(SuitType.Diamonds, 5);
            testCards[4] = new Card(SuitType.Diamonds, 6);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.StraightFlush);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return stright flush.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.Diamonds, 2);
            testCards[1] = new Card(SuitType.Diamonds, 3);
            testCards[2] = new Card(SuitType.Diamonds, 4);
            testCards[3] = new Card(SuitType.Diamonds, 5);
            testCards[4] = new Card(SuitType.Diamonds, 6);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.StraightFlush);
        });
    });


});