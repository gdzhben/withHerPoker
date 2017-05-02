import * as _ from 'lodash';
import {
    BettingType, ShowDownType,
    ICard, Bust, Discard, End, Fold, Raise, See, Show, Bet, IGameInfo, Info,
    IHand, GameEndState
} from '../../interfaces';

export class GameLog {

    private _log: IGameInfo

    constructor() {
        this._log = [];
    }

    public log(info: Info) {
        this._log.push(info);
    }

    public clear() {
        this._log = [];
    }
    public getLog() {
        return _.cloneDeep(this._log);
    }
}
