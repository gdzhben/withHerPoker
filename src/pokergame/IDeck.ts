import { SuitType } from '../interfaces';
import { ICard } from './ICard'


export interface IDeck {
    shuffle(): void;
    returnCard(Card: ICard): void;
    drawCard(): ICard;
    sizeOfDeck(): number;
    containCard(card: ICard): boolean;
}