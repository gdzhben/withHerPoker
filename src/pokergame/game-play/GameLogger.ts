import * as _ from 'lodash';
import {
    IGameLog, IGameInfo, CommandType, EndGameType,
    ICard
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

    public getLog() {
        return _.cloneDeep(this._gamelog);
    }

    private _defautGameInfo(): IGameInfo {
        return {
            currentBet: 0,
            firstRound: [],
            fourthRound: [],
            orderOfPlayer: [],
            secondRound: [],
            thirdRound: []
        };
    }
}