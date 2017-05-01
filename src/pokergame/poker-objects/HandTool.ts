import * as _ from 'lodash';
import {
    IHandClassifier, ICard, IHand, HandType, SuitType,
    SIZE_OF_HANDS, NO_CARD_TYPES
} from "../../interfaces";

export class HandTool {
    private readonly DEFAULT_GAME_VALUE_GAP = 371292 + 2;
    private readonly DEFAULT_GAME_VALUE_ROYAL_FLUSH = this.DEFAULT_GAME_VALUE_GAP * 9;
    private readonly DEFAULT_GAME_VALUE_STRAIGHT_FLUSH = this.DEFAULT_GAME_VALUE_GAP * 8;
    private readonly DEFAULT_GAME_VALUE_FOUR_OF_A_KIND = this.DEFAULT_GAME_VALUE_GAP * 7;
    private readonly DEFAULT_GAME_VALUE_FULL_HOUSE = this.DEFAULT_GAME_VALUE_GAP * 6;
    private readonly DEFAULT_GAME_VALUE_FLUSH = this.DEFAULT_GAME_VALUE_GAP * 5;
    private readonly DEFAULT_GAME_VALUE_STRAIGHT = this.DEFAULT_GAME_VALUE_GAP * 4;
    private readonly DEFAULT_GAME_VALUE_THREE_OF_A_KIND = this.DEFAULT_GAME_VALUE_GAP * 3;
    private readonly DEFAULT_GAME_VALUE_TWO_PAIR = this.DEFAULT_GAME_VALUE_GAP * 2;
    private readonly DEFAULT_GAME_VALUE_ONE_PAIR = this.DEFAULT_GAME_VALUE_GAP;
    private readonly DEFAULT_GAME_VALUE_HIGH_HAND = 0;

    public getGameValue(hand: IHand) {
        let cards = hand.cards();
        let gameValue = 0;
        let typeOfHand = this._findHandType(cards);

        switch (typeOfHand) {
            case HandType.RoyalFlush:
                gameValue += this.DEFAULT_GAME_VALUE_ROYAL_FLUSH;
                break;
            case HandType.StraightFlush:
                gameValue += this.DEFAULT_GAME_VALUE_STRAIGHT_FLUSH;
                break;
            case HandType.FourOfAKind:
                gameValue += this.DEFAULT_GAME_VALUE_FOUR_OF_A_KIND;
                break;
            case HandType.FullHouse:
                gameValue += this.DEFAULT_GAME_VALUE_FULL_HOUSE;
                break;
            case HandType.Flush:
                gameValue += this.DEFAULT_GAME_VALUE_FLUSH;
                break;
            case HandType.Straight:
                gameValue += this.DEFAULT_GAME_VALUE_STRAIGHT;
                break;
            case HandType.ThreeOfAKind:
                gameValue += this.DEFAULT_GAME_VALUE_THREE_OF_A_KIND;
                break;
            case HandType.TwoPairs:
                gameValue += this.DEFAULT_GAME_VALUE_TWO_PAIR;
                break;
            case HandType.OnePair:
                gameValue += this.DEFAULT_GAME_VALUE_ONE_PAIR;
                break;
            case HandType.HighHand:
                gameValue += this.DEFAULT_GAME_VALUE_HIGH_HAND;
                break;
        }

        let sortedCards = this._getCardsSortedByNoOfSameType(cards);
        let coefficient = (NO_CARD_TYPES ** (SIZE_OF_HANDS - 1));
        for (let i = 0; i < SIZE_OF_HANDS; i++ , coefficient /= coefficient) {
            let typeValue = sortedCards[i].getFaceValue() - 2;
            gameValue += typeValue * coefficient;
        }
        return gameValue;
    }

    public getHandType(hand: IHand) {
        let cards = hand.cards();
        return this._findHandType(cards);
    }

    private _findHandType(cards: ICard[]): HandType {
        let suitCount = this._createSuitCount(cards);
        let faceCount = this._createFaceCount(cards);
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



    private _createFaceCount(cards: ICard[]): {
        [key: string]: number
    } {
        let faceCount = {};
        _.forEach(cards, (elem) => {
            let value = _.get(faceCount, elem.getFaceValue(), 0);
            faceCount[elem.getFaceValue()] = value + 1;
        });
        return faceCount;
    }


    private _createSuitCount(cards: ICard[]): {
        [key: number]: number
    } {
        let suitCount = {};
        _.forEach(cards, (elem) => {
            let value = _.get(suitCount, elem.getSuitType(), 0);
            suitCount[elem.getSuitType()] = value + 1;
        });
        return suitCount;
    }


    private isInOrder(cards: ICard[]): boolean {
        for (let i = 0; i < cards.length - 1; i++) {
            if (cards[i + 1].getFaceValue() != (cards[i].getFaceValue() + 1)) {
                return false;
            }
        }
        return true;
    }


    private _getCardsSortedByNoOfSameType(cards: ICard[]): any {
        let gvCount = {};
        gvCount = this._createFaceCount(cards);
        return _.reverse(_.sortBy(cards, (card) => {
            return gvCount[card.getFaceValue()];
        }));
    }
}