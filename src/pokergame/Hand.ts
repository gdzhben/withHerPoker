import { IHand } from './IHand';
import { Card } from './Card';

export class Hand implements IHand {

    private _size: number;
    private _cards: Card[];
    private _discardedCount: number;

    constructor(cards: Card[]) {
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

    // Remove the card at index from the hand.
    public discard(index: number): Card {
        if (index < 0 || index > this._size)
            throw new Error("Index out of bounds");
        else if (this._discardedCount >= 3)
            throw new Error("A maximum of 3 cards can be discarded");

        let temp: Card = this._cards[index];
        this._cards.splice(index, 1);
        this._size = this._cards.length;
        this._discardedCount++;
        return temp;
    }

    // Add a card to the hand if the hand is not full.
    public receiveCard(newCard: Card): void {
        if (this._cards.length >= 5)
            throw new Error("Hand is full")

        // 'push' appends to end of array.
        this._cards.push(newCard);
        this._size = this._cards.length;
        this.sort();
    }

    // Sort the cards based on their Face Value.
    public sort(): void {
        while (true) {
            let swapped: boolean = false;

            for (let i = 0; i < this._size - 1; i++) {
                if (this._cards[i].getFaceValue() > this._cards[i + 1].getFaceValue()) {
                    let temp: Card = this._cards[i];
                    this._cards[i] = this._cards[i + 1];
                    this._cards[i + 1] = temp;
                    swapped = true;
                }
            }

            if (swapped == false)
                break;
        }
    }

    // Return the card for the specified index.
    public getCard(index: number): Card {
        if (index < 0 || index > 4)
            throw new Error("Index out of range")

        return this._cards[index];
    }

    public size(): number {
        return this._size;
    }

    // Get the number of cards that have been discarded from the hand.
    public getDiscardedCount(): number {
        return this._discardedCount;
    }

    // CHANGE THIS ONCE TOSTRING() HAS BEEN ADDED TO CARD CLASS!
    public toString(): string {
        let str = "";

        for (let card of this._cards) {
            str += card.toString() + " ";
        }

        return str;
    }
}