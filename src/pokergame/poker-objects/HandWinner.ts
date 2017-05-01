import { HandClassifier } from './HandClassifier';
import { IHandClassifier, ICard, IHand, HandType, SuitType } from "../../interfaces";
import { Card } from "./Card";
import { Hand } from "./Hand";
import * as _ from 'lodash';

export class HandWinner {
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
    private readonly NO_OF_CARDS = 5;
    private readonly NO_OF_TYPES = 13;
    private _hand1: IHand;
    private _hand2: IHand;

    constructor(hand1: IHand, hand2: IHand) {
        this._hand1 = hand1;
        this._hand2 = hand2;
    }
    private getCardsFromHand(hand: IHand): ICard[] {
        return _.times(hand.size(), (i) => {
            return hand.getCard(i);
        })
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

    private getGameValue(hand: IHand, card: ICard[]): number {
        let gameValue = 0;
        let typeOfHand = new HandClassifier(hand).getTypeOfHand();

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

        let cards = this.getCardsSortedByNoOfSameType(card);
        let coefficient = (this.NO_OF_TYPES ** (this.NO_OF_CARDS - 1));
        for (let i = 0; i < this.NO_OF_CARDS; i++ , coefficient /= coefficient) {
            let typeValue = cards[i].getFaceValue() - 2;
            gameValue += typeValue * coefficient;
        }
        return gameValue;
    }
    private getCardsSortedByNoOfSameType(cards: ICard[]): any {
        let gvCount = {};
        gvCount = this.createFaceCount(cards);
        return _.reverse(_.sortBy(cards, (card) => {
            return gvCount[card.getFaceValue()];
        }));
    }


    public getWinner(): boolean {
        this._hand1.sort();
        this._hand2.sort();
        let cards1 = this.getCardsFromHand(this._hand1);
        let cards2 = this.getCardsFromHand(this._hand2);
        if (this.getGameValue(this._hand1, cards1) > this.getGameValue(this._hand2, cards2)) {
            return true;
        } else {
            return false;
        }
    }
}