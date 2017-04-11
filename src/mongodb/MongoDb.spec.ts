import { MongoDB } from "./MongoDB";
import { IGameData } from './IGameData';

describe('Test', function () {

    let db: MongoDB;
    let gameData: IGameData = {
            username: 'francis',
            startChips: 10,
            endChips: 24,
            startTime: new Date(),
            endTime: new Date(),
            numberOfRounds: 3,
            endState: 1,
            numOfCardsDiscarded: 23,
            gameId: 'testID'
        }

    beforeEach(function () {
        db = new MongoDB();
        db.update(gameData);
    });

    describe('testing the update method', function () {

        it('it must increment the document count', (done) => {
            db = new MongoDB();
            db.update(gameData)
                .then((val) => {
                    expect(val.insertedCount).toBe(1);
                    done();
                }).catch((err: Error) => {
                    done.fail(err.message);
                })
        });
    });
});