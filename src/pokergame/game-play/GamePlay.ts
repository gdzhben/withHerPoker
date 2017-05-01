import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';

import {
    IPlayer, IUserMessage, ITwitterBot, Message
} from '../../interfaces';
import { Dealer } from './Dealer';
import { PlayerGenerator } from '../player/PlayerGenerator'

export class GamePlay {

    private dealers: {
        [key: string]: {
            observable: rx.Subject<string>,
            dealer: Dealer
        }
    } = {};

    constructor(private twitterBot: ITwitterBot) {
    }

    public recievedMessage(user: IUserMessage) {
        let dealer = this.dealers[user.id];
        if (!dealer && _.toLower(user.text) === "dealme") {
            this.dealers[user.id] = {
                observable: new rx.Subject<string>(),
                dealer: undefined
            };
            dealer = this.dealers[user.id];

            let players = this.createPlayers(user.id, user.screenName);
            dealer.dealer = new Dealer(players);
            dealer.dealer.play();
        } else if (!dealer && _.toLower(user.text) !== "dealme") {
            this.twitterBot.sendDirectMessage(user.id, Message.ERRORS.DEAL_ME_ERROR);
        } else {
            if (_.toLower(user.text) === "exit") {
                _.unset(this.dealers, user.id);
            } else {
                dealer.observable.next(user.text);
            }
        }
    }

    private createPlayers(id: string, name: string): IPlayer[] {
        let arr: IPlayer[];
        arr = _.times(4, (index) => {
            return PlayerGenerator.createStupidPlayer('XYZ' + index);
        })
        let tools = {
            observables: this.dealers[id].observable,
            reply: (text: string) => {
                this.twitterBot.sendDirectMessage(id, text);
            }
        };
        arr.push(PlayerGenerator.createHumanPlayer(name, tools));
        return arr;
    }
}