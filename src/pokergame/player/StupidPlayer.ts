import * as _ from 'lodash';

import {
    IPlayer, IHand, CommandType, EndGameType, GameEndState,IGameInfo
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

    public dealCards(hand: IHand): void {
        this._hand = hand;
    }

    public betting(gameInfo: IGameInfo): Promise<CommandType> {
        return Promise.resolve(CommandType.See)
    }

    public discard(gameInfo: IGameInfo): Promise<number[]> {
        return Promise.resolve([0, 1, 2]);
    }

    public showdown(gameInfo: IGameInfo): Promise<EndGameType> {
        return Promise.resolve(EndGameType.Show);
    }

    public endTurn(gameInfo: IGameInfo, endGameState: EndGameType): Promise<boolean> {
        return Promise.resolve(true);
    }
}
