import { IHandClassifier } from './IHandClassifier';
import { HandType } from '../types/HandType';
import { IHand } from './IHand';
import { ICard } from './ICard';
import * as _ from 'lodash';

export class HandClassifier implements IHandClassifier {
    private _hand: IHand;
    private _handOfCards: ICard[] = [];
    private _typeOfHand: HandType;
    private _suitCount: any = {};
    private _faceCount: any = {};
    private readonly SIZE_OF_HAND: number = 5;

    constructor(hand: IHand) {
        this._hand = hand;
    }

    private getCardsFromHand(): void {
        for (let i = 0; i < this.SIZE_OF_HAND; i++) {
            this._handOfCards.push(this._hand.getCard(i));
        }
    }

    private createSuitCount(): void {
        _.forEach(this._handOfCards, (elem) => {
            if (_.hasIn(elem.getSuitType(), _.keysIn(this._suitCount))) {
                this._suitCount[elem.getSuitType()] += 1;
            } else {
                this._suitCount[elem.getSuitType()] = 1;
            }
        })
    }

    private createFaceCount(): void {
        _.forEach(this._handOfCards, (elem) => {
            if (_.hasIn(elem.getFaceValue(), _.keysIn(this._faceCount))) {
                this._faceCount[elem.getFaceValue()] += 1;
            } else {
                this._faceCount[elem.getFaceValue()] = 1;
            }
        })
    }

    private isInOrder(): boolean {
        for (let i = 0; i < this._handOfCards.length - 1; i++) {
            if (this._handOfCards[i + 1].getFaceValue() != (this._handOfCards[i].getFaceValue() + 1)) {
                return false;
            }
        }

        return true;
    }

    public getTypeOfHand(): HandType {
        this._hand.sort;
        this.getCardsFromHand();
        this.createSuitCount();
        this.createFaceCount();
        let isInOrder = this.isInOrder();

        if (_.hasIn(1, this._faceCount)
            && _.hasIn(13, this._faceCount)
            && _.hasIn(12, this._faceCount)
            && _.hasIn(11, this._faceCount)
            && _.hasIn(10, this._faceCount)
            && _.keysIn(this._suitCount).length == 1) {
            return HandType.RoyalFlush;
        }

        if (isInOrder
            && _.keysIn(this._suitCount).length == 1) {
            return HandType.StraightFlush;
        }

        if (_.hasIn(4, _.valuesIn(this._faceCount))) {
            return HandType.FourOfAKind;
        }

        if (_.hasIn(2, _.valuesIn(this._faceCount))
            && (_.hasIn(3, _.valuesIn(this._faceCount)))) {
            return HandType.FullHouse;
        }

        if (_.keysIn(this._suitCount).length == 1) {
            return HandType.Flush;
        }

        if (isInOrder) {
            return HandType.Straight;
        }

        if (_.hasIn(3, _.valuesIn(this._faceCount))) {
            return HandType.ThreeOfAKind;
        }

        if (_.hasIn(2, _.valuesIn(this._faceCount))
            && _.keysIn(this._faceCount).length == 3) {
            return HandType.TwoPairs;
        }

        if ((_.hasIn(2, _.valuesIn(this._faceCount)))
            && (_.keysIn(this._faceCount).length == 4)) {
            return HandType.OnePair;
        }

        return HandType.HighHand;
    }
}