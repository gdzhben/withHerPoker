import { DeckFactory } from "./DeckFactory";
import { ICard } from "./ICard";
import { SuitType } from '../types/SuitType'
import { HandType } from '../types/HandType'
import * as _ from 'lodash';

describe('DeckFactory', () => {

    describe('createStandardCards', () => {

        it('number of cards 52', () => {
            let deckOfCards = DeckFactory.createStandardCards();
            expect(deckOfCards.length).toBe(52);
        });

        it('each suit has 13', () => {
            let deckOfCards = DeckFactory.createStandardCards();

            let deckFilter = _.filter(deckOfCards, (elem: ICard) => {
                return elem.getSuitType() == SuitType.CLUBS;
            });

            expect(deckFilter.length).toBe(13);
        });

        it('A should have 4 different suits card', () => {
            let deckOfCards = DeckFactory.createStandardCards();

            let deckFilter = _.filter(deckOfCards, (elem: ICard) => {
                return elem.getCardName() == 'A';
            });

            expect(deckFilter.length).toBe(4);
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