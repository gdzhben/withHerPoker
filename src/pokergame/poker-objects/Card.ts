import * as _ from 'lodash';

import { SuitType, ICard } from '../../interfaces';

export class Card implements ICard {
    private _suitType: SuitType;
    private _faceValue: number;
    private _cardType: string;
    private readonly CARD_TYPES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    constructor(suitType: SuitType, faceValue: number) {
        this._suitType = suitType;
        this._faceValue = faceValue;
        this._cardType = this.CARD_TYPES[this._faceValue - 1];
    }

    public getCardType(): string {
        return this._cardType;
    }

    public getSuitType(): SuitType {
        return this._suitType;
    }

    public getFaceValue(): number {
        return this._faceValue;
    }

    public toString() {
        return _.join([this._cardType, 'of', SuitType[this._suitType]], ' ');
    }

    public toShortString() {
        return _.join([this._cardType, SuitType[this._suitType].substr(0, 1)], '');
    }

    public equals(card: string | ICard): boolean {
        if (_.isString(card)) {
            return _.isEqual(_.toLower(card), _.toLower(this.toShortString()));
        } else {
            return _.isEqual(card.toShortString(), this.toShortString());
        }
    }
}