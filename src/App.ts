import * as _ from 'lodash';

import { GamePlay } from './pokergame/game-play/GamePlay'
import { TwitterBot } from './twitter-bot/TwitterBot';
import { twitterConfig } from './twitter-bot/twitter-config';

export class App {

    public gamePlay: GamePlay;
    private bot: TwitterBot;

    constructor() {
        this.bot = new TwitterBot(twitterConfig);
        this.gamePlay = new GamePlay(this.bot);
    }

    public start() {
        return this.bot.start();
    }

    public stop(): void {
        this.bot.stop();
    }

    public subscribe() {
        this.bot.directMessagesObservable().subscribe((user) => {
            this.gamePlay.recievedMessage(user);
        });
        // return this.bot.directMessagesStream().then((user) => {
        //     this.gamePlay.recievedMessage(user);
        // });
    }

    public subscribeFollow() {
        this.bot.followObservable().subscribe((user) => {
            this.bot.sendDirectMessage(user.id, "Welcome to poker game!");
        });
        // return this.bot.followStream().then((user) => {
        //     this.bot.sendDirectMessage(user.id, "Welcome to poker game!");
        // });
    }
}