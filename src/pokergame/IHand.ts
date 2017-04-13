import { ICard } from './ICard';

export interface IHand {

    discard(index: number): ICard;

    receiveCard(newCard: ICard): void;

    sort(): void;

    getCard(index: number): ICard;

    size(): number;

    getDiscardedCount(): number;
}