import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';

import {
    IPlayer, IUserMessage, ITwitterBot, Message, IMongoDb
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

    constructor(private twitterBot: ITwitterBot, private mongo: IMongoDb) {
    }

    public recievedMessage(user: IUserMessage) {
        let dealer = this.dealers[user.id];
        if (!dealer && _.toLower(user.text) === "dealme") {
            if (_.keys(this.dealers).length > 100) {
                this.twitterBot.sendDirectMessage(user.id, "Game Buffer Full! Try again later!");
            } else {
                this.dealers[user.id] = {
                    observable: new rx.Subject<string>(),
                    dealer: undefined
                };
                dealer = this.dealers[user.id];

                let players = this.createPlayers(user.id, user.screenName);
                dealer.dealer = new Dealer(players, this.mongo);
                dealer.dealer.play();
            }
        } else if (!dealer && _.toLower(user.text) !== "dealme") {
            this.twitterBot.sendDirectMessage(user.id, Message.ERRORS.DEAL_ME_ERROR);
        } else {
            if (_.toLower(user.text) === "exit") {
                _.unset(this.dealers, user.id);
                this.twitterBot.sendDirectMessage(user.id, Message.QUIT_GAME);
            } else {
                dealer.observable.next(user.text);
            }
        }
        this.removeFinishedGames();
    }

    private removeFinishedGames() {
        let keys = _.keys(this.dealers);
        _.forEach(keys, (key) => {
            if (this.dealers[key].dealer.hasGameEnded()) {
                _.unset(this.dealers, key);
            }
        })
    }

    private createPlayers(id: string, name: string): IPlayer[] {
        let arr: IPlayer[];
        arr = _.times(4, (index) => {
            return PlayerGenerator.createAIPlayer('AI_BOT' + index);
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