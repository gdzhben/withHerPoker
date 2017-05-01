import * as ex from 'express';

import {
    twitterConfig, mongoDbConnectionString
} from './interfaces';
import { App } from './App';
import { MongoDb } from './mongodb/MongoDb';
import { TwitterBot } from './twitter-bot/TwitterBot';

const twitterBot = new TwitterBot(twitterConfig);
const app = new App(twitterBot);
app.start().then(() => {
    console.log('Twitter stream started!');
    app.subscribeDirectMessage();
    app.subscribeFollow();
}).catch((error: Error) => {
    console.log(error);
});

const express: ex.Application = ex();
const mongo = new MongoDb(mongoDbConnectionString);

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