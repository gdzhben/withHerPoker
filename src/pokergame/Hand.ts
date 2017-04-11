import { IHand } from './IHand';
import { Card } from './Card';

export class Hand implements IHand {

    private _size: number;
    private _cards: Card[];

    constructor(cards: Card[]) {
        if (cards.length != 5)
            throw new Error("Expected array of size 5");

        this._cards = [];

        for (let i = 0; i < cards.length; i++) {
            this._cards[i] = cards[i];
        }

        this._size = this._cards.length;
        this.sort();
    }

    public discard(index: number): Card {
        return null;
    }

    // Add a card to the hand if the hand is not full.
    public receiveCard(newCard: Card): void {
        if (this._cards.length >= 5)
            throw new Error("Hand is full")

        // 'push' appends to end of array.
        this._cards.push(newCard);
    }

    // Sort the cards based on their Face Value.
    public sort(): void {
        while (true) {
            let swapped: boolean = false;

            for (let i = 0; i < this._size - 1; i++) {
                if (this._cards[i].getFaceValue() < this._cards[i + 1].getFaceValue()) {
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

    // CHANGE THIS ONCE TOSTRING() HAS BEEN ADDED TO CARD CLASS!
    public toString(): string {
        let str: string = "";

        for (let card of this._cards) {
            str += card.getCardName;
            str += card.getSuitType;
            str += " ";
        }

        return str;
    }
}