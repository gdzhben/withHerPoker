import { SuitType } from '../interfaces';
import { ICard } from './ICard';

export class Card implements ICard {
    private _suitType: SuitType;
    private _faceValue: number;
    private readonly CARD_TYPES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    constructor(suitType: SuitType, faceValue: number) {
        this._suitType = suitType;
        this._faceValue = faceValue;
    }

    public getCardType(): string {
        return this.CARD_TYPES[this._faceValue - 1];
    }

    public getSuitType(): SuitType {
        return this._suitType;
    }

    public getFaceValue(): number {
        return this._faceValue;
    }

    public toString() {
        return this.CARD_TYPES[this._faceValue - 1] + SuitType[this._suitType];
    }
}