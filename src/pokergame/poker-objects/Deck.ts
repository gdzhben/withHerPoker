import * as _ from 'lodash';

import { SuitType, IDeck, ICard } from '../../interfaces';
import { Card } from './Card'

export class Deck implements IDeck {

    private _deckOfCards: ICard[] = [];

    constructor(cards: ICard[]) {
        if (cards) {
            this._deckOfCards = cards;
        }
    }

    public shuffle(): void {
        _.shuffle(this._deckOfCards);
    }

    public drawCard(): ICard {
        if (!_.isEmpty(this._deckOfCards)) {
            return this._deckOfCards.pop();
        } else {
            throw new Error('No card left to draw!');
        }
    }

    public sizeOfDeck(): number {
        return _.size(this._deckOfCards);
    }

    public returnCard(card: ICard): void {
        this._deckOfCards.push(card);
    }

    public containCard(card: ICard): boolean {
        let elem = _.find(this._deckOfCards, (elem: ICard) => {
            return elem.equals(card);
        });

        return _.isObject(elem);
    }
}