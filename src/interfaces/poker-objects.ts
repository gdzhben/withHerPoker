import { SuitType, HandType } from './types';

export interface ICard {
    getCardType(): string;
    getSuitType(): SuitType;
    getFaceValue(): number;
    toString(): string;
    toShortString(): string;
    equals(card: ICard): boolean;
}

export interface IDeck {
    shuffle(): void;
    returnCard(Card: ICard): void;
    dealCard(noOfCards: number): ICard[];
    cardsLeft(): number;
    hasCard(card: ICard): boolean;
}

export interface IHand {
    discardAndReceive(discardCard: number | ICard, newCard: ICard): ICard;
    sort(): void;
    getCard(index: number): ICard;
    cards(): ICard[];
    size(): number;
    getDiscardedCount(): number;
    toString(): string;
    getHandType(): HandType;
    getGameValue(): number;
}

export interface IHandClassifier {
    getTypeOfHand(): HandType;
}

export interface IPokerChip {
    getValue(): number;
    add(chip: IPokerChip): IPokerChip;
    subtract(chip: IPokerChip): IPokerChip;
}