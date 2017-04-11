import { DeckFactory } from "./DeckFactory";
import { ICard } from "./ICard";
import { SuitType, HandType } from '../type'
import * as _ from 'lodash';

describe('Test', function () {

    var test: DeckFactory;

    describe('testing the DeckFactory class', function () {

        it('it must return 52', function () {
            let deckOfCards: ICard[] = DeckFactory.createStandardCards();
            expect(deckOfCards.length).toBe(52);
        });

        it('it must return 13', function () {
            let deckOfCards= DeckFactory.createStandardCards();

            let deckFilter=_.filter(deckOfCards, (elem: ICard) => {
                return elem.getSuitType() == SuitType.CLUBS
            })

            expect(deckFilter.length).toBe(13);
        });
        it('it must return 4', function () {
            let deckOfCards: ICard[] = DeckFactory.createStandardCards();

            _.filter(deckOfCards, (elem: ICard) => {
                return elem.getCardName() == 'A'
            })

            expect(_.filter).toBe(4);
        });

        it('it must return hello', function () {
            let deckOfCards: ICard[] = DeckFactory.createStandardCards();

            _.filter(deckOfCards, (elem: ICard) => {
                return elem.getFaceValue() == 2
            })

            expect(_.filter).toBe(4);
        });
    });
});