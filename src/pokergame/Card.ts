import { SuitType } from '../types/SuitType';
import { ICard } from './ICard';

export class Card implements ICard {

    private cardName: string
    private suitType: SuitType
    private faceValue: number

    constructor(cardName: string, suitType: SuitType, faceValue: number) {
        this.cardName = cardName;
        this.suitType = suitType;
        this.faceValue = faceValue;
    }

    public getCardName(): string {
        return this.cardName;
    }

    public getSuitType(): SuitType {
        return this.suitType;
    }

    public getSuitTypeString(): string {
        if (this.suitType == SuitType.CLUBS) 
            return "C";
        else if (this.suitType == SuitType.DIAMONDS) 
            return "D";
        else if (this.suitType == SuitType.HEARTS) 
            return "H";
        else
            return "S";
    }

    public getFaceValue(): number {
        return this.faceValue;
    }

    public toString(): string {
        let str: string = this.getCardName() + this.getSuitTypeString();
        return str;
    }

}