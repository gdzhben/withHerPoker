import { ITwitterBot } from './interfaces';
import { TwitterBot } from './twitter-bot/TwitterBot';
import { twitterConfig } from './twitter-bot/twitter-config';


export class App {

    private _twitterBot: ITwitterBot;

    constructor() {
        this._twitterBot = new TwitterBot(twitterConfig);
    }

    public start(): void {
        this._twitterBot.start();

        this._twitterBot.directMessagesStream()
            .then((user) => {

            }).catch((err: Error) => {
                console.log(err);
            });

        this._twitterBot.followStream()
            .then((user) => {

            }).catch((err) => {
                console.log(err);
            })
    }

    public stop(): void {
        this._twitterBot.stop();
    }
}