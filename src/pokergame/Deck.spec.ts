import { Card } from "./Card";
import { Deck } from "./Deck";
import { SuitType } from '../types/SuitType';
import { DeckFactory } from './DeckFactory'
import * as _ from 'lodash';

describe('Deck', () => {

    let test: Deck;

    beforeEach(() => {
        test = new Deck(DeckFactory.createStandardCards());
    });

    describe('shuffle', () => {

        it('after shuffle deck size should still be 52', () => {
            test.shuffle();
            let result = test.getDeckOfCards().length;

            expect(result).toBe(52);
        });
    });

    describe('discard card', () => {

        it('after discard a card the length of the discard array must be 1', () => {
            let card = test.drawCard();
            test.returnCard(card);
            let result = test.getDiscardedCards();

            expect(result.length).toBe(1);
        });
    });
    describe('discardedcard list test ', () => {

        it('after discard a card the card that been discarded should be in the discarded list', () => {
            let card = test.drawCard();
            test.returnCard(card);
            let result = test.containCard(card, test.getDiscardedCards());
            expect(result).toBe(true);
        });
    });
});