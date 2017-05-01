export enum CommandType {
    See,
    Raise,
    Fold,
    Show,
    Discard
}

export enum HandType {
    RoyalFlush = 10,
    StraightFlush = 9,
    FourOfAKind = 8,
    FullHouse = 7,
    Flush = 6,
    Straight = 5,
    ThreeOfAKind = 4,
    TwoPairs = 3,
    OnePair = 2,
    HighHand = 1
}

export enum SuitType {
    Hearts = 2,
    Clubs = 1,
    Spades = 3,
    Diamonds = 0
}