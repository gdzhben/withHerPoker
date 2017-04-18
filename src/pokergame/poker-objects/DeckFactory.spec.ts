import * as _ from 'lodash';

import { ICard, SuitType, HandType } from "../../interfaces";
import { DeckFactory } from "./DeckFactory";

describe('DeckFactory', () => {

    describe('createStandardCards', () => {

        it('number of cards 52', () => {
            let deckOfCards = DeckFactory.createStandardCards();
            expect(deckOfCards.length).toBe(52);
        });

        it('each suit has 13', () => {
            let deckOfCards = DeckFactory.createStandardCards();

            let deckFilter = _.filter(deckOfCards, (elem: ICard) => {
                return elem.getSuitType() == SuitType.Clubs;
            });

            expect(deckFilter.length).toBe(13);
        });

        it('2 facevalue should have 4 different suits card', () => {
            let deckOfCards = DeckFactory.createStandardCards();

            let deckFilter = _.filter(deckOfCards, (elem: ICard) => {
                return elem.getFaceValue() == 2;
            });

            expect(deckFilter.length).toBe(4);
        });
    });
});