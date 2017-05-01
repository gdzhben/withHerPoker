import * as rx from 'rxjs/Rx';

import { ICommand } from './commands';
import { CommandType, GameEndState, EndGameType, PlayerState } from './types';
import { IPokerChip, IHand, ICard } from './poker-objects';

export interface IPlayer {
    getName(): string;
    dealCards(hand: IHand): void;
    betting(gameInfo: any): Promise<CommandType>;
    discard(gameInfo: any): Promise<number[]>;
    showdown(gameInfo: any): Promise<EndGameType>;
    endTurn(gameInfo: any, endGameState: GameEndState): Promise<boolean>;
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