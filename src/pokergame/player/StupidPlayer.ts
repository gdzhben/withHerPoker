import * as _ from 'lodash';

import {
    IPlayer, IHand, BettingType, ShowDownType, GameEndState, IGameInfo, GameOverState
    , PlayerInfo
} from '../../interfaces';

export class StupidPlayer implements IPlayer {

    private _name: string;
    private _hand: IHand;

    constructor(name: string) {
        this._name = name;
    }

    public getName(): string {
        return this._name;
    }

    public dealCards(hand: IHand, info: PlayerInfo): void {
        this._hand = hand;
    }

    public betting(gameInfo: IGameInfo, info: PlayerInfo): Promise<BettingType> {
        return Promise.resolve(BettingType.See)
    }

    public discard(gameInfo: IGameInfo, info: PlayerInfo): Promise<number[]> {
        return Promise.resolve([0, 1, 2]);
    }

    public showdown(gameInfo: IGameInfo, info: PlayerInfo): Promise<ShowDownType> {
        return Promise.resolve(ShowDownType.Show);
    }

    public endTurn(gameInfo: IGameInfo, info: PlayerInfo): Promise<boolean> {
        return Promise.resolve(true);
    }

    public gameOver(game: GameOverState, money?: number): void {

    }
}
