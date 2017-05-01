import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import {
    IPlayer, IHand, CommandType, EndGameType, PlayerTools, MAX_CARDS_DISCARD,
    SIZE_OF_HANDS, GameEndState, Message
} from '../../interfaces';
import { GamePlay } from '../game-play/GamePlay';

export class HumanPlayer implements IPlayer {

    private _name: string;
    private _hand: IHand;
    private tools: PlayerTools
    private messages: string[];

    private resolveBetting: (value?: CommandType | PromiseLike<CommandType>) => void;
    private resolveDiscard: (value?: number[] | PromiseLike<number[]>) => void;
    private resolveShowdown: (value?: EndGameType | PromiseLike<EndGameType>) => void;
    private resolveEnd: (value?: boolean | PromiseLike<boolean>) => void;

    constructor(name: string, tools: PlayerTools) {
        this._name = name;
        this.tools = tools;
        this.messages = [];
        this.subscribe();
    }

    public getName(): string {
        return this._name;
    }

    public dealCards(hand: IHand): void {
        this._hand = hand;
    }

    public betting(gameInfo: any): Promise<CommandType> {
        return new Promise<CommandType>((resolve, reject) => {
            this.tools.reply(Message.QUESTION.BETTING_COMMAND_QUESTION);
            let type = this.validateBetting();
            if (type) {
                resolve(type);
            } else {
                this.resolveBetting = resolve;
            }
        });
    }

    public discard(gameInfo: any): Promise<number[]> {
        return new Promise<number[]>((resolve, reject) => {
            this.tools.reply(Message.QUESTION.DISCARD_COMMAND_QUESTION);
            let type = this.validateDiscard();
            if (type) {
                resolve(type);
            } else {
                this.resolveDiscard = resolve;
            }
        });
    }

    public showdown(gameInfo: any): Promise<EndGameType> {
        return new Promise<EndGameType>((resolve, reject) => {
            this.tools.reply(Message.QUESTION.SHOWDOWN_COMMAND_QUESTION);
            let type = this.validateShowdown();
            if (type) {
                resolve(type);
            } else {
                this.resolveShowdown = resolve;
            }
        });
    }


    public endTurn(gameInfo: any, endGameState: EndGameType): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.tools.reply(Message.QUESTION.PLAY_AGAIN_COMMAND_QUESTION);
            let type = this.validateEnd();
            if (type) {
                resolve(type);
            } else {
                this.resolveEnd = resolve;
            }
        });
    }


    private subscribe() {
        this.tools.observables.subscribe((text) => {
            this.messages.push(_.toLower(text));
            if (this.resolveBetting) {
                let type = this.validateBetting();
                if (type) {
                    this.resolveBetting(type);
                    this.resolveBetting = undefined;
                }
            } else if (this.resolveDiscard) {
                let type = this.validateDiscard();
                if (type) {
                    this.resolveDiscard(type);
                    this.resolveDiscard = undefined;
                }
            } else if (this.resolveShowdown) {
                let type = this.validateShowdown();
                if (type) {
                    this.resolveShowdown(type);
                    this.resolveShowdown = undefined;
                }
            } else if (this.resolveEnd) {
                let type = this.validateEnd();
                if (type) {
                    this.resolveEnd(type);
                    this.resolveEnd = undefined;
                }
            }
        });
    }

    private validateBetting(): CommandType {
        let msg = undefined;
        if (this.messages.length > 0) {
            msg = this.messages.shift();
        }
        if (msg === "see") {
            return CommandType.See;
        } else if (msg === "raise") {
            return CommandType.Raise;
        } else if (msg === "fold") {
            return CommandType.Fold;
        }
        this.tools.reply(Message.ERRORS.BETTING_COMMAND_ERROR);
        return undefined;
    }

    private validateDiscard(): number[] {
        let msg = undefined;
        if (this.messages.length > 0) {
            msg = this.messages.shift();
        }

        if (_.isEqual(msg, 'no')) {
            return [];
        }

        let arr = _.split(msg, /[, ]*/);
        let nArr: number[] = [];
        let error = false;

        _.forEach(arr, (elem) => {
            let nos = _.parseInt(elem);
            if (!_.isNaN(nos) && nos >= 0 && nos < SIZE_OF_HANDS) {
                nArr.push(nos);
            } else {
                error = true;
            }
        })

        if (nArr.length < 3 && !error) {
            return nArr;
        }
        this.tools.reply(Message.ERRORS.DISCARD_COMMAND_ERROR);
        return undefined;
    }

    private validateShowdown(): EndGameType {
        let msg = undefined;
        if (this.messages.length > 0) {
            msg = this.messages.shift();
        }

        if (msg === "show") {
            return EndGameType.Show;
        } else if (msg === "fold") {
            return EndGameType.Lose;
        }

        this.tools.reply(Message.ERRORS.SHOWDOWN_COMMAND_ERROR);
        return undefined;
    }

    private validateEnd(): boolean {
        let msg = undefined;
        if (this.messages.length > 0) {
            msg = this.messages.shift();
        }

        if (msg === "yes" || msg === "y") {
            return true;
        } else if (msg === "no" || msg === "n") {
            return false;
        }

        this.tools.reply(Message.ERRORS.PLAY_AGAIN_COMMAND_ERROR);
        return undefined;
    }

}
