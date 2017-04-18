import * as _ from 'lodash';

import { IHandClassifier, HandType, IHand, ICard } from '../../interfaces';

export class HandClassifier implements IHandClassifier {
    private _hand: IHand;

    constructor(hand: IHand) {
        this._hand = hand;
    }

    private getCardsFromHand(): ICard[] {
        return _.times(this._hand.size(), (i) => {
            return this._hand.getCard(i);
        })
    }

    private createSuitCount(cards: ICard[]): {
        [key: number]: number
    } {
        let suitCount = {};
        _.forEach(cards, (elem) => {
            let value = _.get(suitCount, elem.getSuitType(), 0);
            suitCount[elem.getSuitType()] = value + 1;
        });
        return suitCount;
    }

    private createFaceCount(cards: ICard[]): {
        [key: string]: number
    } {
        let faceCount = {};
        _.forEach(cards, (elem) => {
            let value = _.get(faceCount, elem.getFaceValue(), 0);
            faceCount[elem.getFaceValue()] = value + 1;
        });
        return faceCount;
    }

    private isInOrder(cards: ICard[]): boolean {
        for (let i = 0; i < cards.length - 1; i++) {
            if (cards[i + 1].getFaceValue() != (cards[i].getFaceValue() + 1)) {
                return false;
            }
        }
        return true;
    }

    public getTypeOfHand(): HandType {
        this._hand.sort();
        let cards = this.getCardsFromHand();
        let suitCount = this.createSuitCount(cards);
        let faceCount = this.createFaceCount(cards);
        let isInOrder = this.isInOrder(cards);

        if (_.hasIn(faceCount, 1)
            && _.hasIn(faceCount, 10)
            && _.hasIn(faceCount, 11)
            && _.hasIn(faceCount, 12)
            && _.hasIn(faceCount, 13)
            && _.keysIn(suitCount).length == 1) {
            return HandType.RoyalFlush;
        }

        if (isInOrder
            && _.keysIn(suitCount).length == 1) {
            return HandType.StraightFlush;
        }

        if (_.includes(_.valuesIn(faceCount), 4)) {
            return HandType.FourOfAKind;
        }

        if (_.includes(_.valuesIn(faceCount), 2)
            && _.includes(_.valuesIn(faceCount), 3)) {
            return HandType.FullHouse;
        }

        if (_.keysIn(suitCount).length == 1) {
            return HandType.Flush;
        }

        if (isInOrder) {
            return HandType.Straight;
        }

        if (_.includes(_.valuesIn(faceCount), 3)) {
            return HandType.ThreeOfAKind;
        }

        if (_.includes(_.valuesIn(faceCount), 2)
            && _.keysIn(faceCount).length == 3) {
            return HandType.TwoPairs;
        }

        if (_.includes(_.valuesIn(faceCount), 2)
            && (_.keysIn(faceCount).length == 4)) {
            return HandType.OnePair;
        }

        return HandType.HighHand;
    }
}