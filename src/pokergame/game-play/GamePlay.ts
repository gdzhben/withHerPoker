import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';

import {
    IPlayer, IUserMessage, ITwitterBot
} from '../../interfaces';
import { Dealer } from './Dealer';
import { HumanPlayer } from '../player/HumanPlayer';
import { StupidPlayer } from '../player/StupidPlayer';
import { TwitterBot } from '../../twitter-bot/TwitterBot';
import { twitterConfig } from '../../twitter-bot/twitter-config';

export class GamePlay {

    private dealers: Dealer[] = [];
    private players: {
        [key: string]: rx.Subject<string>
    } = {};

    constructor(private twitterBot: ITwitterBot) {

    }

    public recievedMessage(user: IUserMessage) {
        let observable = this.players[user.id];
        if (!observable) {
            this.players[user.id] = new rx.Subject<string>();
            let dealer = new Dealer(this.createPlayers(user.id));
            this.dealers.push(dealer);
            dealer.play();
        } else {
            observable.next(user.text);
        }
    }

    private createPlayers(id: string): IPlayer[] {
        let arr: IPlayer[];
        arr = _.times(4, (index) => {
            return new StupidPlayer('XYZ' + index);
        })
        arr.push(new HumanPlayer(id, {
            observables: this.players[id],
            reply: (text: string) => {
                this.twitterBot.sendDirectMessage(id, text);
            }
        }));
        return arr;
    }
}