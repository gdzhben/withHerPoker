import { SuitType, HandType } from './types';

export interface ICard {
    getCardType(): string;
    getSuitType(): SuitType;
    getFaceValue(): number;
    toString(): string;
    toShortString(): string;
    equals(card: string | ICard): boolean;
}

export interface IDeck {
    shuffle(): void;
    returnCard(Card: ICard): void;
    drawCard(): ICard;
    sizeOfDeck(): number;
    containCard(card: ICard): boolean;
}

export interface IHand {
    discardAndReceive(discardCard: number | string | ICard, newCard: ICard): ICard;
    sort(): void;
    getCard(index: number): ICard;
    size(): number;
    getDiscardedCount(): number;
    toString(): string;
}

export interface IHandClassifier {
    getTypeOfHand(): HandType;
}

export interface IPokerChip {
    getValue(): number;
    add(chip: IPokerChip): IPokerChip;
    subtract(chip: IPokerChip): IPokerChip;
}