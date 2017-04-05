import mongodb = require('mongodb');

interface MongoDBInterface {
    update(username: string, startChips: number, endChips: number, startTime: Date, endTime: Date, 
        numberOfRounds: number, endState: number, numOfCardsDiscarded: number, gameId: string): void;
    getLeaderBoard(gameID: string): void;
    getGame(gameID: string): void;
}

export class MongoDB implements MongoDBInterface{
    update(username: string, startChips: number, endChips: number, startTime: Date, endTime: Date) {
        
    }

    getLeaderBoard(gameID: string) {

    }
    
    getGame(gameID: string) {

    }
}
