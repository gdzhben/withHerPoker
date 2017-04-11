import { SuitType } from '../types/SuitType';

export interface ICard {
    getCardName(): string;

    getSuitType(): SuitType;

    getFaceValue(): number;
}