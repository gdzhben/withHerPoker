import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

import {
    IPlayer, IHand, BettingType, ShowDownType, PlayerTools, MAX_CARDS_DISCARD,
    SIZE_OF_HANDS, GameEndState, Message, IGameInfo, GameOverState, PlayerInfo, RAISE_AMOUNT
} from '../../interfaces';
import { GamePlay } from '../game-play/GamePlay';

export class HumanPlayer implements IPlayer {

    private _name: string;
    private _hand: IHand;
    private tools: PlayerTools
    private messages: string[];
    private myInfo: PlayerInfo;

    private resolveBetting: (value?: BettingType | PromiseLike<BettingType>) => void;
    private resolveDiscard: (value?: number[] | PromiseLike<number[]>) => void;
    private resolveShowdown: (value?: ShowDownType | PromiseLike<ShowDownType>) => void;
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

    public dealCards(hand: IHand, info: PlayerInfo): void {
        this._hand = hand;
        this.tools.reply(hand.toString());
        this.myInfo = info;
    }

    public betting(gameInfo: IGameInfo, info: PlayerInfo): Promise<BettingType> {
        this.myInfo = info;
        return new Promise<BettingType>((resolve, reject) => {
            this.display(gameInfo);
            this.tools.reply(Message.QUESTION.BETTING_COMMAND_QUESTION);
            this.resolveBetting = resolve;
        });
    }

    public discard(gameInfo: IGameInfo, info: PlayerInfo): Promise<number[]> {
        this.myInfo = info;
        return new Promise<number[]>((resolve, reject) => {
            this.display(gameInfo);
            this.tools.reply(Message.QUESTION.DISCARD_COMMAND_QUESTION);
            this.resolveDiscard = resolve;
        });
    }

    public showdown(gameInfo: IGameInfo, info: PlayerInfo): Promise<ShowDownType> {
        this.myInfo = info;
        return new Promise<ShowDownType>((resolve, reject) => {
            this.display(gameInfo);
            this.tools.reply(Message.QUESTION.SHOWDOWN_COMMAND_QUESTION);
            this.resolveShowdown = resolve;
        });
    }

    public endTurn(gameInfo: IGameInfo, info: PlayerInfo): Promise<boolean> {
        this.myInfo = info;
        return new Promise<boolean>((resolve, reject) => {
            this.display(gameInfo);
            this.tools.reply(Message.QUESTION.PLAY_AGAIN_COMMAND_QUESTION);
            this.resolveEnd = resolve;
        });
    }


    public gameOver(game: GameOverState, money?: number): void {
        if (game == GameOverState.Bust) {
            this.tools.reply(Message.OTHER.BUST_MESSAGE);
        } else {
            this.tools.reply(`You won ${money} chips!`
                + "\n" + Message.OTHER.WON_MESSAGE);
        }
    }

    private lastIndex = 0;
    private display(gameInfo: IGameInfo) {
        let str = '';
        _.forEach(gameInfo, (info, index) => {
            if (index >= this.lastIndex) {
                str = str.concat(info.toString() + '\n');
            }
        })
        this.lastIndex = gameInfo.length;
        if (str) {
            this.tools.reply(str);
        }
    }

    private subscribe() {
        this.tools.observables.subscribe((text) => {
            let msg = _.toLower(text);
            if (this.resolveBetting) {
                let type = this.validateBetting(msg);
                if (type) {
                    this.resolveBetting(type);
                    this.resolveBetting = undefined;
                }
            } else if (this.resolveDiscard) {
                let type = this.validateDiscard(msg);
                if (type) {
                    this.resolveDiscard(type);
                    this.resolveDiscard = undefined;
                }
            } else if (this.resolveShowdown) {
                let type = this.validateShowdown(msg);
                if (type) {
                    this.resolveShowdown(type);
                    this.resolveShowdown = undefined;
                }
            } else if (this.resolveEnd) {
                let type = this.validateEnd(msg);
                if (type) {
                    this.resolveEnd(type);
                    this.resolveEnd = undefined;
                }
            } else {
                this.tools.reply(Message.ERRORS.WAIT_FOR_SERVER_TO_PROCESS);
            }
        });
    }

    private validateBetting(msg: string): BettingType {
        if (msg === "see") {
            if (this.myInfo.wallet.getValue() >= this.myInfo.currentBet.getValue()) {
                return BettingType.See;
            } else {
                this.tools.reply(Message.ERRORS.NOT_ENOUGH_CHIPS);
                return undefined;
            }
        } else if (msg === "raise") {
            if (this.myInfo.wallet.getValue() >= this.myInfo.currentBet.getValue() + RAISE_AMOUNT) {
                return BettingType.Raise;
            } else {
                this.tools.reply(Message.ERRORS.NOT_ENOUGH_CHIPS);
                return undefined;
            }
        } else if (msg === "fold") {
            return BettingType.Fold;
        }
        this.tools.reply(Message.ERRORS.BETTING_COMMAND_ERROR);
        this.tools.reply(`You have ${this.myInfo.wallet.getValue()} chip(s) left!`);
        return undefined;
    }

    private validateDiscard(msg: string): number[] {
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
        let uniqueNos = _.uniq(nArr);

        if (uniqueNos.length < nArr.length) {
            this.tools.reply(Message.ERRORS.DUPLICATE_DISCARD_ERROR);
            return undefined;
        }

        if (nArr.length <= MAX_CARDS_DISCARD && !error) {
            return nArr;
        }
        this.tools.reply(Message.ERRORS.DISCARD_COMMAND_ERROR);
        return undefined;
    }

    private validateShowdown(msg: string): ShowDownType {
        if (msg === "show") {
            return ShowDownType.Show;
        } else if (msg === "fold") {
            return ShowDownType.Fold;
        }

        this.tools.reply(Message.ERRORS.SHOWDOWN_COMMAND_ERROR);
        return undefined;
    }

    private validateEnd(msg: string): boolean {
        if (msg === "yes" || msg === "y") {
            return true;
        } else if (msg === "no" || msg === "n") {
            return false;
        }

        this.tools.reply(Message.ERRORS.PLAY_AGAIN_COMMAND_ERROR);
        return undefined;
    }

}
