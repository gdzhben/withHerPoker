export enum CommandType {
    See,
    Raise,
    Fold
}

export enum EndGameType {
    Show,
    Lose
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
    Hearts,
    Clubs,
    Spades,
    Diamonds
}

export enum PlayerState {
    Playing,
    Fold,
    Bust
}

export enum GameEndState {
    Lost = 0,
    Won = 1,
    Fold = 2
}