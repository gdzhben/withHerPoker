import { IGameData } from './IGameData';
import { ILeaderBoard } from './ILeaderBoard';

export interface IMongoDb {
    addGameData(gameData: IGameData): Promise<IGameData>;
    getGameData(username: string): Promise<IGameData[]>;
    getLeaderboard(limit: number): Promise<ILeaderBoard[]>;
    deleteGameData(username: string): Promise<void>;
    close(): Promise<void>;
}