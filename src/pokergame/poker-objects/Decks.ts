import * as _ from 'lodash';

import { SuitType, IDeck, ICard } from '../../interfaces';
import { Deck } from './Deck'

export class Decks {

    private _deck: IDeck;
    private _discarded: IDeck;

    constructor(cards: ICard[]) {
        this._deck = new Deck(cards);
        this._discarded = new Deck([]);
    }

    public shuffle(): void {
        this._deck.shuffle();
    }

    public dealCard(noOfCards: number = 1): ICard[] {
        if (noOfCards < 1) {
            throw new Error("No of cards to be dealt cannot be less than 1");
        } else if (noOfCards > this._deck.sizeOfDeck()) {
            throw new Error("No of cards to be dealt cannot be greater than the size of the deck");
        }
        return _.times(noOfCards, () => {
            return this._deck.drawCard();
        });
    }

    public returnCard(card: ICard): void {
        if (this._deck.containCard(card)) {
            throw new Error('The card is already in the deck!');
        } else if (this._discarded.containCard(card)) {
            throw new Error('The card has already been discarded');
        }
        this._discarded.returnCard(card);
    }

    public reset() {
        _.times(this._discarded.sizeOfDeck(), () => {
            let card = this._discarded.drawCard();
            this._deck.returnCard(card);
        });
    }
}