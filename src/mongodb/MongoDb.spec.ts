import * as mongoose from 'mongoose';

import { MongoDb } from './MongoDb';
import { IGameData } from '../interfaces';

describe('MongoDb', () => {

    let mongoDb: MongoDb;
    let mockUsername = 'sukrat';
    let testConnectionString = 'mongodb://withHer:1234@localhost/test';

    beforeEach(() => {
        mongoDb = new MongoDb(testConnectionString);
    });

    beforeEach((done) => {
        let mockGameData: IGameData = {
            username: mockUsername,
            startChips: 100,
            endChips: 200,
            startTime: new Date(),
            endTime: new Date(),
            numberOfRounds: 3,
            endState: 'fold'
        };
        mongoDb.addGameData(mockGameData);
        mongoDb.addGameData(mockGameData);
        mongoDb.addGameData(mockGameData);
        mongoDb.addGameData(mockGameData).then(() => {
            done();
        }).catch(() => {
            done.fail('Inserting mock data failed!');
        });
    });

    afterEach((done) => {
        mongoDb.deleteGameData(mockUsername);
        mongoDb.close()
            .then(() => {
                done();
            }).catch(() => {
                done.fail();
            });
    });

    describe('addGameData', () => {

        it('should save the gamedata successfully!', (done) => {
            let mockGameData: IGameData = {
                username: mockUsername,
                startChips: 10,
                endChips: 24,
                startTime: new Date(),
                endTime: new Date(),
                numberOfRounds: 3,
                endState: 'win'
            };

            mongoDb.addGameData(mockGameData)
                .then((result) => {
                    expect(result.endChips).toEqual(mockGameData.endChips);
                    expect(result.endState).toEqual(mockGameData.endState);
                    expect(result.endTime).toEqual(mockGameData.endTime);
                    expect(result.numberOfRounds).toEqual(mockGameData.numberOfRounds);
                    expect(result.startChips).toEqual(mockGameData.startChips);
                    expect(result.startTime).toEqual(mockGameData.startTime);
                    expect(result.username).toEqual(mockGameData.username);
                    done();
                }).catch((err: Error) => {
                    done.fail(err.message);
                });
        });

        it('should not save the gamedata if username or any field is blank!', (done) => {
            let mockGameData: IGameData = {
                username: '',
                startChips: null,
                endChips: null,
                startTime: null,
                endTime: null,
                numberOfRounds: null,
                endState: ''
            };

            mongoDb.addGameData(mockGameData)
                .then((result) => {
                    done.fail('Test failed as it saved invalid data.');
                }).catch((err: Error) => {
                    done();
                });
        });
    });

    describe('getGameData', () => {

        it('it must get game data', (done) => {
            mongoDb.getGameData(mockUsername)
                .then((result) => {
                    expect(result.length).toBe(4);
                    done();
                }).catch((err: Error) => {
                    done.fail(err.message);
                });
        });
    });

    describe('getLeaderboard', () => {

        it('should get the leaderboard', (done) => {
            mongoDb.getLeaderboard(1)
                .then((result) => {
                    var leaderboard = result[0];

                    expect(leaderboard.noOfGamesPlayed).toBe(4);
                    expect(leaderboard.totalEndChips).toBe(800);
                    expect(leaderboard.totalStartChips).toBe(400);
                    expect(leaderboard.username).toBe(mockUsername);
                    expect(result.length).toBe(1);

                    done();
                }).catch((err: Error) => {
                    done.fail(err.message);
                });
        });
    });

    describe('deleteGameData', () => {
        it('should delete all the game data', (done) => {
            mongoDb.deleteGameData(mockUsername)
                .then(() => {
                    done();
                }).catch((err: Error) => {
                    done.fail(err.message);
                });
        });
    });
});