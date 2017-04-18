import * as mongoose from 'mongoose';
import * as _ from 'lodash';

import { IMongoDb, IGameData, ILeaderBoard } from '../interfaces';
import { gameDataSchema } from './Schemas';
import { GameDataModel } from './Models';

export class MongoDb implements IMongoDb {

    private _db: mongoose.Connection;
    private _gameDataModel: mongoose.Model<GameDataModel>;

    constructor(connectionString: string) {
        require('mongoose').Promise = global.Promise;
        mongoose.connect(connectionString);
        this._db = mongoose.connection;

        this._defineModel();
    }

    public addGameData(gameData: IGameData): Promise<IGameData> {
        let model = new this._gameDataModel(gameData);
        return model.save()
            .then((result) => {
                if (result._id) {
                    return result;
                }
                return Promise.reject('Error occured while saving.');
            }).catch((err: any) => {
                let error = new Error(err);
                return Promise.reject(error);
            });
    }

    public getGameData(username: string): Promise<IGameData[]> {
        return this._gameDataModel
            .find({
                username: username
            })
            .exec()
            .then((result) => {
                if (result) {
                    return result;
                }
                return Promise.reject('Game data for that user doesnot exists.');
            }).catch((err: any) => {
                let error = new Error(err);
                return Promise.reject(error);
            });
    }

    public getLeaderboard(limit: number): Promise<ILeaderBoard[]> {
        return this._gameDataModel
            .aggregate([
                {
                    $group: {
                        _id: '$username',
                        totalEndChips: { $sum: '$endChips' },
                        totalStartChips: { $sum: '$startChips' },
                        noOfGamesPlayed: { $sum: 1 }
                    }
                },
                { $sort: { totalEndChips: -1 } },
                { $limit: limit }

            ])
            .exec()
            .then((result: Object[]) => {
                let mapped = _.map(result, (elem: any) => {
                    let leaderBoard: ILeaderBoard = {
                        noOfGamesPlayed: elem.noOfGamesPlayed,
                        totalEndChips: elem.totalEndChips,
                        totalStartChips: elem.totalStartChips,
                        username: elem._id
                    };
                    return leaderBoard;
                });
                return mapped;
            }).catch((err: any) => {
                let error = new Error(err);
                return Promise.reject(error);
            });
    }

    public deleteGameData(username: string): Promise<void> {
        return this._gameDataModel
            .remove({
                username: username
            }).exec()
            .catch((err: any) => {
                let error = new Error(err);
                return Promise.reject(error);
            });
    }

    public close(): Promise<void> {
        return this._db.close();
    }

    private _defineModel(): void {
        this._gameDataModel = this._db.model<GameDataModel>('GameData', gameDataSchema);
    }
}

