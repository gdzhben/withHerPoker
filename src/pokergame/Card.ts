import { SuitType } from '../types/SuitType';
import { ICard } from './ICard';

export class Card implements ICard {

    private _cardName: string
    private _suitType: SuitType
    private _faceValue: number

    constructor(cardName: string, suitType: SuitType, faceValue: number) {
        this._cardName = cardName;
        this._suitType = suitType;
        this._faceValue = faceValue;
    }

    public getCardName(): string {
        return this._cardName;
    }

    public getSuitType(): SuitType {
        return this._suitType;
    }

    public getFaceValue(): number {
        return this._faceValue;
    }

}