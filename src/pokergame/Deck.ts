import { SuitType } from '../types/SuitType';
import { Card } from './Card'
import { IDeck } from './IDeck';
import { ICard } from './ICard';
import * as _ from 'lodash';

export class Deck implements IDeck {

    private _deckOfCards: ICard[] = [];
    constructor(cards: ICard[]) {
        this._deckOfCards = cards;
    }

    public shuffle(): void {
        _.shuffle(this._deckOfCards);
    }

    public drawCard(): ICard {
        if (this._deckOfCards.length !== 0) {
            return this._deckOfCards.pop();
        } else {
            throw new Error;
        }

    }
<<<<<<< HEAD
    public sizeOfDeck(): number {
=======

    public sizeOfDeck(): number {

>>>>>>> 15b01ef9b54a13dd2e2e11c94f211013b9cc4e26
        return this._deckOfCards.length;
    }
    public returnCard(card: ICard): void {
        this._deckOfCards.push(card);
    }
    public containCard(card: ICard): boolean {
        let isSameCard: boolean = false;
        for (let cardInList of this._deckOfCards) {
            if (cardInList.getFaceValue() == card.getFaceValue() && cardInList.getSuitType() == card.getSuitType()) {
                isSameCard = true;
            }

        }
        return isSameCard;
    }

}