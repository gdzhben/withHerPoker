import * as _ from 'lodash';

import { SuitType, IDeck, ICard } from '../../interfaces';

export class Deck implements IDeck {

    private _deck: ICard[];
    private _discarded: ICard[];

    constructor(cards: ICard[]) {
        this._deck = _.slice(cards) || [];
        this._discarded = [];
        this.shuffle();
    }

    public shuffle(): void {
        this._deck = _.shuffle(this._deck);
    }

    public dealCard(noOfCards: number = 1): ICard[] {
        if (noOfCards < 1) {
            throw new Error("No of cards to be dealt cannot be less than 1");
        } else if (noOfCards > this._deck.length) {
            throw new Error("No of cards to be dealt cannot be greater than the size of the deck");
        }
        return _.times(noOfCards, () => {
            return this._deck.pop();
        });
    }

    public returnCard(card: ICard): void {
        if (this._isInDeck(card)) {
            throw new Error('The card is already in the deck!');
        } else if (this._isInDiscarded(card)) {
            throw new Error('The card has already been discarded');
        }
        this._discarded.push(card);
    }

    public reset() {
        _.times(this._discarded.length, () => {
            let card = this._discarded.pop();
            this._deck.push(card);
        });
        this._deck = _.shuffle(this._deck);
    }

    public cardsLeft() {
        return this._deck.length;
    }

    public hasCard(card: ICard): boolean {
        return this._isInDeck(card) || this._isInDiscarded(card);
    }

    private _isInDeck(card: ICard): boolean {
        let index = _.findIndex(this._deck, (c) => {
            return c.equals(card);
        })
        return index != -1;
    }

    private _isInDiscarded(card: ICard): boolean {
        let index = _.findIndex(this._discarded, (c) => {
            return c.equals(card);
        })
        return index != -1;
    }
}