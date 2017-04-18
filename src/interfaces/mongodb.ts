export interface IGameData {
    username: string;
    startChips: number;
    endChips: number;
    startTime: Date;
    endTime: Date;
    numberOfRounds: number;
    endState: string;
}

export class ILeaderBoard {
    username: string;
    totalEndChips: number;
    totalStartChips: number;
    noOfGamesPlayed: number;
}

export interface IMongoDb {
    addGameData(gameData: IGameData): Promise<IGameData>;
    getGameData(username: string): Promise<IGameData[]>;
    getLeaderboard(limit: number): Promise<ILeaderBoard[]>;
    deleteGameData(username: string): Promise<void>;
    close(): Promise<void>;
}