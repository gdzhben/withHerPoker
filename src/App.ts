import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';

import {
    Message, ITwitterBot,
    ITwitterStream, IApp
} from './interfaces'
import { GamePlay } from './pokergame/game-play/GamePlay'
import { TwitterBot } from './twitter-bot/TwitterBot';

export class App implements IApp {

    public gamePlay: GamePlay;
    private bot: ITwitterBot & IApp & ITwitterStream;

    private directMessageSubscription: rx.Subscription;
    private followSubscription: rx.Subscription;

    constructor(bot: ITwitterBot & IApp & ITwitterStream) {
        this.bot = bot;
        this.gamePlay = new GamePlay(this.bot);
    }

    public start(): Promise<string> {
        return this.bot.start();
    }

    public stop(): void {
        this.bot.stop();
        this.directMessageSubscription && this.directMessageSubscription.unsubscribe();
        this.followSubscription && this.followSubscription.unsubscribe();
    }

    public subscribeDirectMessage(): void {
        this.bot.directMessagesObservable().subscribe((user) => {
            console.log('Message Recieved');
            this.gamePlay.recievedMessage(user);
        }).add((error: Error) => {
            console.log(error);
        });
    }

    public subscribeFollow(): void {
        this.bot.followObservable().subscribe((user) => {
            console.log('Follow Recieved');

            this.bot.createFriendship(user.id).then(() => {
                console.log('User followed!');
            });

            this.bot.sendDirectMessage(user.id, Message.WELCOME_MESSAGE).then(() => {
                this.bot.sendDirectMessage(user.id, Message.INSTRUCTION_MESSAGE).then(() => {
                    this.bot.sendDirectMessage(user.id, Message.INSTRUCTION_MESSAGE_2).then(() => {
                        console.log('Welcome Message sent!');
                    })
                })
            });
        }).add((error: Error) => {
            console.log(error);
        });
    }
}