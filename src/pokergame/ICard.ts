import { SuitType } from '../types/SuitType';

export interface ICard {
    getCardType(): string;
    getSuitType(): SuitType;
    getFaceValue(): number;
    toString(): string;
}