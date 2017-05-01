import * as rx from 'rxjs/Rx';

import { ICommand } from './commands';
import { CommandType, GameEndState, EndGameType, PlayerState } from './types';
import { IPokerChip, IHand, ICard } from './poker-objects';

export interface IPlayer {
    getName(): string;
    dealCards(hand: IHand): void;
    betting(gameInfo: IGameInfo): Promise<CommandType>;
    discard(gameInfo: IGameInfo): Promise<number[]>;
    showdown(gameInfo: IGameInfo): Promise<EndGameType>;
    endTurn(gameInfo: IGameInfo): Promise<boolean>;
}

export interface IPlayerGame {
    player: IPlayer;
    wallet: IPokerChip;
    hand: IHand;
    noDiscardedCard: number;
    status: PlayerState;
}


export interface PlayerTools {
    observables: rx.Observable<string>;
    reply: (text: string) => void;
}


export class Bet {
    public readonly commandType: CommandType;
    constructor(
        public readonly name: string,
        public readonly amount?: number) {

    }

    toString(): string {
        return '';
    }
}

export class Raise extends Bet {
    public readonly commandType = CommandType.Raise;
    toString(): string {
        return `${this.name} raised bet to ${this.amount} chip(s).`
    }
}

export class See extends Bet {
    public readonly commandType = CommandType.See;
    toString(): string {
        return `${this.name} see that ${this.amount} chip(s).`
    }
}

export class Fold extends Bet {
    public readonly commandType = CommandType.Fold;
    toString(): string {
        return `${this.name} folds.`
    }
}

export class Discard {
    constructor(
        public readonly name: string,
        public readonly noOfCardDiscarded: number) {

    }

    toString(): string {
        return `${this.name} discards ${this.noOfCardDiscarded} card(s).`
    }
}

export class Bust {
    constructor(
        public readonly name: string) {

    }
    toString(): string {
        return `${this.name} got busted!`
    }
}

export class Show {
    constructor(
        public readonly name: string,
        public readonly hand: IHand) {

    }
    toString(): string {
        return `${this.name} shows his hand! (${this.hand.toString()})`
    }
}

export class End {
    constructor(
        public readonly name: string,
        public readonly gameEndState: GameEndState,
        public readonly chipsLeft: number) {

    }
    toString(): string {
        return `${this.name} ${GameEndState[this.gameEndState]} has ${this.chipsLeft} chip(s) left!`
    }
}

export type IGameInfo = Info[];
export type Info = (Bet | Discard | Bust | Show);