import { Card } from './Card';
import { Hand } from './Hand';
import { IHandClassifier } from './IHandClassifier';

export class HandClassifier implements IHandClassifier {

    private _cards: Card[];

    constructor(hand: Hand) {
        if (hand.size() != 5) 
            throw new Error("Only a full hand can be classified");

        this._cards = [];

        for (let i = 0; i < hand.size(); i++) {
            this._cards[i] = hand.getCard(i);
        }
    }

    public getHandType(): HandType {
        return null;
    }

}