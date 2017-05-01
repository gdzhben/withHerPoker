import { ICard, IHand, HandType, SuitType } from "../../interfaces";
import { Card } from "./Card";
import { Hand } from "./Hand";
import { HandTool } from './HandTool';

describe('HandTool', () => {

    let cards: ICard[];
    let handTool: HandTool;

    beforeEach(() => {
        handTool = new HandTool();
    });

    describe('getGameValue', () => {

        it('Should return true', () => {
            cards = [
                new Card(SuitType.Clubs, 10),
                new Card(SuitType.Diamonds, 10),
                new Card(SuitType.Diamonds, 9),
                new Card(SuitType.Clubs, 8),
                new Card(SuitType.Hearts, 7),
            ];
            let hand1 = new Hand(cards, handTool);

            cards = [
                new Card(SuitType.Clubs, 2),
                new Card(SuitType.Diamonds, 2),
                new Card(SuitType.Diamonds, 3),
                new Card(SuitType.Clubs, 4),
                new Card(SuitType.Hearts, 5)
            ];
            let hand2 = new Hand(cards, handTool);

            let value1 = handTool.getGameValue(hand1);
            let value2 = handTool.getGameValue(hand2);
            expect(value1 > value2).toBeTruthy();
        });
    });

    describe('getHandType', () => {

        it('Should return twopair.', () => {
            cards = [
                new Card(SuitType.Clubs, 2),
                new Card(SuitType.Diamonds, 2),
                new Card(SuitType.Diamonds, 3),
                new Card(SuitType.Clubs, 4),
                new Card(SuitType.Hearts, 4)
            ];
            let hand = new Hand(cards, handTool);
            let result = handTool.getHandType(hand);

            expect(result).toBe(HandType.TwoPairs);
        });

        it('Should return onepair.', () => {
            cards = [
                new Card(SuitType.Clubs, 2),
                new Card(SuitType.Diamonds, 2),
                new Card(SuitType.Diamonds, 3),
                new Card(SuitType.Clubs, 4),
                new Card(SuitType.Hearts, 5)];
            let hand = new Hand(cards, handTool);

            let result = handTool.getHandType(hand);

            expect(result).toBe(HandType.OnePair);
        });

        it('Should return flush.', () => {
            cards = [
                new Card(SuitType.Diamonds, 2),
                new Card(SuitType.Diamonds, 7),
                new Card(SuitType.Diamonds, 4),
                new Card(SuitType.Diamonds, 5),
                new Card(SuitType.Diamonds, 6)
            ];
            let hand = new Hand(cards, handTool);

            let result = handTool.getHandType(hand);

            expect(result).toBe(HandType.Flush);
        });

        it('Should return royal flush.', () => {
            cards = [
                new Card(SuitType.Diamonds, 1),
                new Card(SuitType.Diamonds, 10),
                new Card(SuitType.Diamonds, 11),
                new Card(SuitType.Diamonds, 12),
                new Card(SuitType.Diamonds, 13)
            ];
            let hand = new Hand(cards, handTool);

            let result = handTool.getHandType(hand);

            expect(result).toBe(HandType.RoyalFlush);
        });

        it('Should return stright flush.', () => {
            cards = [
                new Card(SuitType.Diamonds, 2),
                new Card(SuitType.Diamonds, 3),
                new Card(SuitType.Diamonds, 4),
                new Card(SuitType.Diamonds, 5),
                new Card(SuitType.Diamonds, 6)
            ];
            let hand = new Hand(cards, handTool);

            let result = handTool.getHandType(hand);

            expect(result).toBe(HandType.StraightFlush);
        });

        it('Should return stright flush.', () => {
            cards = [
                new Card(SuitType.Diamonds, 2),
                new Card(SuitType.Diamonds, 3),
                new Card(SuitType.Diamonds, 4),
                new Card(SuitType.Diamonds, 5),
                new Card(SuitType.Diamonds, 6)
            ];
            let hand = new Hand(cards, handTool);

            let result = handTool.getHandType(hand);

            expect(result).toBe(HandType.StraightFlush);
        });
    });



});