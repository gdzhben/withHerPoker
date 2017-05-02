import * as ex from 'express';

import {
    twitterConfig, mongoDbConnectionString
} from './interfaces';
import { App } from './App';
import { MongoDb } from './mongodb/MongoDb';
import { TwitterBot } from './twitter-bot/TwitterBot';

const twitterBot = new TwitterBot(twitterConfig);
const mongo = new MongoDb(mongoDbConnectionString);
const app = new App(twitterBot, mongo);
const express: ex.Application = ex();

express.listen(3000, () => {
    console.log('withHer Poker app listening on port 3000!');
});

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


app.start().then(() => {
    console.log('Twitter stream started!');
    app.subscribeDirectMessage();
    app.subscribeFollow();
}).catch((error: Error) => {
    console.log(error);
});
