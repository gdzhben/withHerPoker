import { Card } from './Card';

export interface IHand {

    discard(index: number): Card;

    receiveCard(newCard: Card): void;

    sort(): void;

    getCard(index: number): Card;

    size(): number;
}