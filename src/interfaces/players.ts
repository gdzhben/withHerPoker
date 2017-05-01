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
    endTurn(gameInfo: IGameInfo, endGameState: EndGameType): Promise<boolean>;
}

export interface IPlayerGame {
    player: IPlayer;
    wallet: IPokerChip;
    hand: IHand;
    noDiscardedCard: number;
    status: PlayerState;
}

export interface IGameLog {
    rounds: IGameInfo[]
}

export interface IGameInfo {
    currentBet: number
    orderOfPlayer: string[],
    firstRound: IBettingRound[],
    secondRound: IDiscardingRound[],
    thirdRound: IBettingRound[],
    fourthRound: IShowdownRound[],
    toString: (roundNo: number) => string;
}

export interface IBettingRound {
    name: string,
    action: CommandType
}

export interface IDiscardingRound {
    name: string,
    noOfCardsDiscarded: number
}

export interface IShowdownRound {
    name: string,
    action: EndGameType,
    cards: ICard[]
}

export interface PlayerTools {
    observables: rx.Observable<string>;
    reply: (text: string) => void;
}