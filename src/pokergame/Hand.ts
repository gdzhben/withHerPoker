import * as _ from 'lodash';

import { IHand } from './IHand';
import { ICard } from './ICard';

export class Hand implements IHand {
    private _size: number;
    private _cards: ICard[];
    private _discardedCount: number;

    constructor(cards: ICard[]) {
        if (cards.length != 5)
            throw new Error("Expected array of size 5");

        this._cards = [];
        this._discardedCount = 0;

        for (let i = 0; i < cards.length; i++) {
            this._cards[i] = cards[i];
        }

        this._size = this._cards.length;
        this.sort();
    }

    public discard(index: number): ICard {
        if (index < 0 || index > this._size)
            throw new Error("Index out of bounds");
        else if (this._discardedCount >= 3)
            throw new Error("A maximum of 3 cards can be discarded");

        let temp: ICard = this._cards[index];
        this._cards.splice(index, 1);
        this._size = this._cards.length;
        this._discardedCount++;
        return temp;
    }

    public receiveCard(newCard: ICard): void {
        if (this._cards.length >= 5)
            throw new Error("Hand is full")

        this._cards.push(newCard);
        this._size = this._cards.length;
        this.sort();
    }

    public sort(): void {
        this._cards = _.sortBy(this._cards, (elem) => {
            return elem.getFaceValue();
        });
    }

    public getCard(index: number): ICard {
        if (index < 0 || index > 4)
            throw new Error("Index out of range")

        return this._cards[index];
    }

    public size(): number {
        return this._size;
    }

    public getDiscardedCount(): number {
        return this._discardedCount;
    }

    public toString(): string {
        let mapped = _.map(this._cards, (elem) => {
            return elem.toString();
        });

        return _.join(mapped, ' ');
    }
}