export interface IGameData {
    username: string;
    startChips: number;
    endChips: number;
    startTime: Date;
    endTime: Date;
    numberOfRounds: number;
    endState: number;
    numOfCardsDiscarded: number;
    gameId: string;
}