import { SuitType } from '../interfaces';

export interface ICard {
    getCardType(): string;
    getSuitType(): SuitType;
    getFaceValue(): number;
    toString(): string;
}