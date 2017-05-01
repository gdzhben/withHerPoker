import * as _ from 'lodash';

import {
    IPlayer, IHand, CommandType, EndGameType, GameEndState
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

    public betting(gameInfo: any): Promise<CommandType> {
        return Promise.resolve(CommandType.See)
    }

    public discard(gameInfo: any): Promise<number[]> {
        return Promise.resolve([0, 1, 2]);
    }

    public showdown(gameInfo: any): Promise<EndGameType> {
        return Promise.resolve(EndGameType.Show);
    }

    public endTurn(gameInfo: any, endGameState: GameEndState): Promise<boolean> {
        return Promise.resolve(true);
    }
}
