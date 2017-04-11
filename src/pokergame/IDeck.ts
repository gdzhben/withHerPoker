import { SuitType } from '../types/SuitType';
import { ICard } from './ICard'


export interface IDeck {
    shuffle(): void;

    returnCard(Card: ICard): void;

    drawCard(): ICard;
    
}