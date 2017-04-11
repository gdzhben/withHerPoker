import * as mongodb from 'mongodb';

interface MongoDBInterface {
    update(username: string, startChips: number, endChips: number, startTime: string, endTime: string, 
        numberOfRounds: number, endState: number, numOfCardsDiscarded: number, gameId: string): void;
    getLeaderBoard(gameID: string): void;
    getGame(gameID: string): void;
}

export class MongoDB implements MongoDBInterface {
    update(username: string, startChips: number, endChips: number, startTime: string, endTime: string,
        numberOfRounds: number, endState: number, numOfCardsDiscarded: number, gameId: string) {
        
        // Make connection to db
        let MongoClient = require('mongodb').MongoClient;

        // URI containing our localhost credentials.
        let connectString = "mongodb://admin:admin123@localhost/?authSource=admin&authMechanism=SCRAM-SHA-1";

        MongoClient.connect(connectString, function(err:any, db:any) {
            let collection = db.collection('test');
            let newEntry = {'userName': username, 'startChips': startChips, 'endChips': endChips,
                'startTime': startTime, 'endTime': endTime, 'numberOfRounds': numberOfRounds,
                'endState': endState, 'numOfCardsDiscarded': numOfCardsDiscarded, 'gameId': gameId};

            collection.insert(newEntry);
        });
    }

    getLeaderBoard() {
         // Make connection to db
        // Make connection to db
        let MongoClient = require('mongodb').MongoClient;

        // URI containing our localhost credentials.
        let connectString = "mongodb://admin:admin123@localhost/?authSource=admin&authMechanism=SCRAM-SHA-1";
        let lb = '';

        MongoClient.connect(connectString, function(err:any, db:any) {
            let collection = db.collection('test');

            // Iterate through collection
            for (let document in collection) {
                lb += document.toString;
            }
        });

        return lb;
    }
    
    getGame(gameID: string) {

    }
}

