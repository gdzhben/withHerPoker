import * as _ from 'lodash';

import { SuitType } from '../../interfaces';
import { Deck } from "./Deck";
import { DeckFactory } from './DeckFactory';

describe('Deck', () => {

    let test: Deck;

    beforeEach(() => {
        test = new Deck(DeckFactory.createStandardCards());
    });

    describe('shuffle', () => {

        it('after shuffle deck size should still be 52', () => {
            test.shuffle();

            let result = test.sizeOfDeck();
            expect(result).toBe(52);
        });
    });

    describe('sizeOfDeck', () => {

        it('after we draw a card the size of deck should be 51 instead of 52', () => {
            let card = test.drawCard();

            let result = test.sizeOfDeck();

            expect(result).toBe(51);
        });
    });

    describe('drawCard', () => {

        it('after we draw a card the size of deck should be 51 instead of 52', () => {
            let card = test.drawCard();

            let result = test.sizeOfDeck();
            expect(result).toBe(51);
        });
    });

    describe('returnCard ', () => {

        it('after discard a card the card that been discarded should be in deck again', () => {
            let card = test.drawCard();

            test.returnCard(card);

            let result = test.containCard(card);
            expect(result).toBe(true);
        });
    });

    describe('containCard ', () => {

        it('after discard a card the card that been discarded should be in deck again', () => {
            let card = test.drawCard();
            test.returnCard(card);

            let result = test.containCard(card);

            expect(result).toBe(true);
        });
    });
});