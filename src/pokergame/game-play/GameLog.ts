import * as _ from 'lodash';
import {
    CommandType, EndGameType,
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

    public logRaise(name: string, amount: number) {
        let raise = new Raise(
            name,
            amount
        );
        this._log.push(raise);
    }

    public logSee(name: string, amount: number) {
        let see = new See(
            name,
            amount
        );
        this._log.push(see);
    }

    public logFold(name: string) {
        let fold = new Fold(
            name
        );
        this._log.push(fold);
    }

    public logDiscard(name: string, noOfCardDiscarded: number) {
        let discard = new Discard(
            name,
            noOfCardDiscarded
        );
        this._log.push(discard);
    }

    public logBust(name: string) {
        let bust = new Bust(
            name
        );
        this._log.push(bust);
    }

    public logShow(name: string, hand: IHand) {
        let raise = new Show(
            name,
            hand
        );
        this._log.push(raise);
    }

    public logEnd(name: string, gameEndState: GameEndState, chipsLeft: number) {
        let end = new End(
            name,
            gameEndState,
            chipsLeft
        );
        this._log.push(end);
    }

    public getLog() {
        return _.cloneDeep(this._log);
    }
}
