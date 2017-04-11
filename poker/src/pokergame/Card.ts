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

        public getFaceValue(): number {
            return this.faceValue;
        }

}