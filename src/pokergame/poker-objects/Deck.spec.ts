import * as _ from 'lodash';

import {
    SuitType
} from '../../interfaces';
import { Deck } from "./Deck";
import { Card } from "./Card";

describe('Deck', () => {

    let deck: Deck;
    let cards: Card[];

    beforeEach(() => {
        cards = [
            new Card(SuitType.Clubs, 10),
            new Card(SuitType.Diamonds, 10),
            new Card(SuitType.Diamonds, 9),
            new Card(SuitType.Clubs, 8),
            new Card(SuitType.Hearts, 7)
        ];
        deck = new Deck(cards);
    });

    describe('shuffle', () => {

        it('after shuffle deck size should still be the same', () => {
            deck.shuffle();

            let result = deck.cardsLeft();
            expect(result).toBe(cards.length);
        });
    });

    describe('cardsLeft', () => {

        it('after we draw a card the size of deck should be one less', () => {
            let card = deck.dealCard();

            let result = deck.cardsLeft();

            expect(result).toBe(cards.length - card.length);
        });
    });

    describe('dealCard', () => {

        it('after we draw a card the size of deck should be less', () => {
            let card = deck.dealCard(2);

            let result = deck.cardsLeft();
            expect(result).toBe(cards.length - card.length);
        });
    });

    describe('returnCard ', () => {

        it('after discard a card the card that been discarded should be in deck again', () => {
            let card = deck.dealCard();

            deck.returnCard(card[0]);

            let result = deck.hasCard(card[0]);
            expect(result).toBeTruthy();
        });
    });

    describe('hasCard ', () => {

        it('hasCard shoudld return false if card not present', () => {
            let card = deck.dealCard();

            let result = deck.hasCard(card[0]);

            expect(result).toBeFalsy();
        });
    });
});