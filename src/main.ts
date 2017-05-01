import { App } from './App';
import * as ex from 'express';
import { MongoDb } from './mongodb/MongoDb';

var app = new App();
app.start().then(() => {
    console.log('Twitter stream started!');

    app.subscribe();
    // .then(() => {
    //     console.log('Message being recieved!');
    // }).catch((error: Error) => {
    //     console.log(error);
    // });

    app.subscribeFollow();
    // .then(() => {
    //     console.log('Follow being recieved!');
    // }).catch((error: Error) => {
    //     console.log(error);
    // });
}).catch((error: Error) => {
    console.log(error);
});

var express: ex.Application = ex();

express.listen(3000, () => {
    console.log('withHer Poker app listening on port 3000!');
});


let testConnectionString = 'mongodb://withHer:1234@localhost/test';
var mongo = new MongoDb(testConnectionString);
express.get('/leaderboard', (req, res) => {
    mongo.getLeaderboard(10).then((data) => {
        res.send(data);
    }).catch((error: Error) => {
        res.statusCode = 500;
        res.send(error);
    })
});

express.get('/', (req, res) => {
    res.sendFile(__dirname.replace('/build', '') + '/src/leaderboard.html');
});