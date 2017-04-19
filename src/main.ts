import { App } from './App';
import * as ex from 'express';
import { MongoDb } from './mongodb/MongoDb';

var app = new App();
app.start();

var express: ex.Application = ex();

express.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


let testConnectionString = 'mongodb://withHer:1234@localhost/test';
var mongo = new MongoDb(testConnectionString);
express.get('/leaderboard', (req, res) => {
    let data = mongo.getLeaderboard(10);
    res.send(data);
});