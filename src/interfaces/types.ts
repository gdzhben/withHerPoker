export enum BettingType {
    See = 1,
    Raise,
    Fold
}

export enum ShowDownType {
    Show = 1,
    Fold
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
    Hearts = 1,
    Clubs,
    Spades,
    Diamonds
}

export enum PlayerState {
    Playing = 1,
    Fold,
    Bust
}

export enum GameEndState {
    Lost = 1,
    Won = 2,
    Fold = 3
}

export enum GameOverState {
    Won = 1,
    Bust
}