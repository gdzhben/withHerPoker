import { IMongoDB } from './IMongoDB';
import { MongoClient,InsertOneWriteOpResult } from 'mongodb'
import { IGameData } from './IGameData';

export class MongoDB implements IMongoDB {

    // URI containing our localhost credentials.
    private connectString = "mongodb://admin:admin123@localhost/?authSource=admin&authMechanism=SCRAM-SHA-1";

    update(gd: IGameData): Promise<InsertOneWriteOpResult> {

        return MongoClient.connect(this.connectString)
            .then((db) => {
                let collection = db.collection('test');
                let newEntry = {
                    userName: gd.username, startChips: gd.startChips, endChips: gd.endChips,
                    startTime: gd.startTime, endTime: gd.endTime, numberOfRounds: gd.numberOfRounds,
                    endState: gd.endState, numOfCardsDiscarded: gd.numOfCardsDiscarded, gameId: gd.gameId
                };

                let insertion = collection.insert(newEntry);
                db.close();
                return insertion;
            }).catch((err: Error) => {
                throw new Error("Connection failed");
            });
    }

    getLeaderBoard() {

        return MongoClient.connect(this.connectString)
            .then((db) => {
                let collection = db.collection('test');
                let lb = '';

                 // Iterate through collection
                let cursor = collection.find();

                //TODO fix incrementing
                while (cursor.hasNext()) {
                    lb += cursor.map( function(u: string) {
                        return u;
                    });
                }

                db.close();
                return lb;
            }).catch((err: Error) => {
                throw new Error("Connection failed");
            });
    }

    getGame(gameID: string) {

    }
}

