import { SuitType } from '../types/SuitType';
import { ICard } from './ICard';

export class Card implements ICard {

<<<<<<< HEAD
    private _cardName: string;
    private _suitType: SuitType;
    private _faceValue: number;
=======
    private _cardName: string
    private _suitType: SuitType
    private _faceValue: number
>>>>>>> 15b01ef9b54a13dd2e2e11c94f211013b9cc4e26

    constructor(cardName: string, suitType: SuitType, faceValue: number) {
        this._cardName = cardName;
        this._suitType = suitType;
        this._faceValue = faceValue;
    }

    public getCardName(): string {
<<<<<<< HEAD
        return this._cardName;
    }

=======

        return this._cardName;
    }

>>>>>>> 15b01ef9b54a13dd2e2e11c94f211013b9cc4e26
    public getSuitType(): SuitType {
        return this._suitType;
    }

    public getFaceValue(): number {
        return this._faceValue;
<<<<<<< HEAD
=======


    }

    public getSuitTypeString(): string {
        if (this._suitType == SuitType.CLUBS) 
            return "Clubs";
        else if (this._suitType == SuitType.DIAMONDS) 
            return "Diamonds";
        else if (this._suitType == SuitType.HEARTS) 
            return "Hearts";
        else
            return "Spades";
    }

    public toString(): string {
        let str = this.getCardName() + this.getSuitTypeString();
        return str;

>>>>>>> 15b01ef9b54a13dd2e2e11c94f211013b9cc4e26
    }

}