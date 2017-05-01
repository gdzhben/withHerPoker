import * as _ from 'lodash';
import {
    IGameLog, IGameInfo, CommandType, EndGameType,
    ICard, IBettingRound, IShowdownRound, IDiscardingRound
} from '../../interfaces';

export class GameLogger {

    private _gamelog: IGameLog;
    private _gameInfo: IGameInfo;

    constructor() {
        this._gamelog = {
            rounds: []
        };
        this._gameInfo = this._defautGameInfo();
    }

    public setOrder(names: string[]) {
        this._gameInfo.orderOfPlayer = _.slice(names);
    }

    public addFirstRound(name: string, action: CommandType) {
        this._gameInfo.firstRound.push({
            action: action,
            name: name
        });
    }

    public addSecondRound(name: string, noOfCardDiscarded: number) {
        this._gameInfo.secondRound.push({
            noOfCardsDiscarded: noOfCardDiscarded,
            name: name
        });
    }

    public addThirdRound(name: string, action: CommandType) {
        this._gameInfo.thirdRound.push({
            action: action,
            name: name
        });
    }

    public addFourthRound(name: string, action: EndGameType, cards?: ICard[]) {
        this._gameInfo.fourthRound.push({
            action: action,
            cards: cards,
            name: name
        });
    }

    public setCurrentBet(amount: number) {
        this._gameInfo.currentBet = amount;
    }

    public finishRound() {
        this._gamelog.rounds.push(this._gameInfo);
        this._gameInfo = this._defautGameInfo();
    }

    public getLog(): IGameInfo {
        let info = _.cloneDeep(this._gameInfo);
        if (!info) {
            info = this._defautGameInfo();
        }
        return info;
    }

    private _defautGameInfo(): IGameInfo {
        let obj: IGameInfo = {
            currentBet: 0,
            firstRound: [],
            fourthRound: [],
            orderOfPlayer: [],
            secondRound: [],
            thirdRound: [],
            toString: (roundNo: number) => {
                let str = '';
                if (roundNo == 1) {
                    str = `Betting Round!\n`;
                    _.forEach(obj.firstRound, (elem) => {
                        str = str.concat(`${elem.name} did ${CommandType[elem.action]}\n`);
                    })
                    str = str.concat(`Current bet: ${obj.currentBet}\n`);
                } else if (roundNo == 2) {
                    str = `Discard Card Round!\n`;
                    _.forEach(obj.secondRound, (elem) => {
                        str = str.concat(`${elem.name} discarded ${elem.noOfCardsDiscarded} cards.\n`);
                    })
                } else if (roundNo == 3) {
                    str = `2nd Betting Round\n`;
                    _.forEach(obj.thirdRound, (elem) => {
                        str = str.concat(`${elem.name} did ${CommandType[elem.action]}\n`);
                    })
                    str = str.concat(`Current bet: ${obj.currentBet}\n`);
                } else if (roundNo == 4) {
                    str = `Showdown round!\n`;
                    _.forEach(obj.fourthRound, (elem) => {
                        str = str.concat(`${elem.name} did ${EndGameType[elem.action]}\n`);
                    })
                }
                return str;
            }
        };
        return obj;
    }
}