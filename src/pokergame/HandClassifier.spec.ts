import { ICard } from "./ICard";
import { Card } from "./Card";
import { IHand } from "./IHand";
import { Hand } from "./Hand";
import { HandType } from '../interfaces'
import { SuitType } from '../interfaces'
import { HandClassifier } from './HandClassifier';

describe('HandClassifier', () => {

    beforeEach(() => {
    });
    describe('getTypeOfHand', () => {

        it('Should return twopair.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.CLUBS, 2);
            testCards[1] = new Card(SuitType.DIAMONDS, 2);
            testCards[2] = new Card(SuitType.DIAMONDS, 3);
            testCards[3] = new Card(SuitType.CLUBS, 4);
            testCards[4] = new Card(SuitType.HEARTS, 4);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.TwoPairs);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return onepair.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.CLUBS, 2);
            testCards[1] = new Card(SuitType.DIAMONDS, 2);
            testCards[2] = new Card(SuitType.DIAMONDS, 3);
            testCards[3] = new Card(SuitType.CLUBS, 4);
            testCards[4] = new Card(SuitType.HEARTS, 5);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.OnePair);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return flush.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.DIAMONDS, 2);
            testCards[1] = new Card(SuitType.DIAMONDS, 7);
            testCards[2] = new Card(SuitType.DIAMONDS, 4);
            testCards[3] = new Card(SuitType.DIAMONDS, 5);
            testCards[4] = new Card(SuitType.DIAMONDS, 6);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.Flush);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return royal flush.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.DIAMONDS, 1);
            testCards[1] = new Card(SuitType.DIAMONDS, 10);
            testCards[2] = new Card(SuitType.DIAMONDS, 11);
            testCards[3] = new Card(SuitType.DIAMONDS, 12);
            testCards[4] = new Card(SuitType.DIAMONDS, 13);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.RoyalFlush);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return stright flush.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.DIAMONDS, 2);
            testCards[1] = new Card(SuitType.DIAMONDS, 3);
            testCards[2] = new Card(SuitType.DIAMONDS, 4);
            testCards[3] = new Card(SuitType.DIAMONDS, 5);
            testCards[4] = new Card(SuitType.DIAMONDS, 6);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.StraightFlush);
        });
    });
    describe('getTypeOfHand', () => {

        it('Should return stright flush.', () => {
            let testCards: ICard[] = [];
            testCards[0] = new Card(SuitType.DIAMONDS, 2);
            testCards[1] = new Card(SuitType.DIAMONDS, 3);
            testCards[2] = new Card(SuitType.DIAMONDS, 4);
            testCards[3] = new Card(SuitType.DIAMONDS, 5);
            testCards[4] = new Card(SuitType.DIAMONDS, 6);
            let test = new HandClassifier(new Hand(testCards));
            let result = test.getTypeOfHand();
            expect(result).toBe(HandType.StraightFlush);
        });
    });


});