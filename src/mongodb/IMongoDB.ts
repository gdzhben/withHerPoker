import { IGameData } from './IGameData';

export interface IMongoDB {
    update(gameData: IGameData): void;
    getLeaderBoard(gameID: string): void;
    getGame(gameID: string): void;
}