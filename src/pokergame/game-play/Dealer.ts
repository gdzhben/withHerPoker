import * as _ from 'lodash';

import {
    IPlayer, IPlayerGame, START_MONEY, CommandType, RAISE_AMOUNT,
    IPokerChip, EndGameType, ICard
} from '../../interfaces';
import { PokerChip } from '../poker-objects/PokerChip'
import { GameState } from './GameState'
import { GameLogger } from './GameLogger'

export class Dealer {

    private _gameState: GameState;
    private _players: IPlayer[] = [];
    private _gameLogger: GameLogger = new GameLogger();

    constructor(players: IPlayer[]) {
        if (players && players.length !== 5) {
            throw new Error("must have 5 players in order to play.");
        }
        this._gameState = new GameState(players);
    }

    public play(): void {
        this.orderOfPlayers();
        this._gameState.dealPlayers();
        this.firstRound();
    }

    private orderOfPlayers() {
        let order = _.map(this._players, (player) => {
            return player.getName();
        });
        this._gameLogger.setOrder(order);
    }

    private firstRound() {
        let player = this._gameState.getNextPlayer();
        if (this._gameState.isGameOver()) {
            this.endRound();
            return;
        }
        if (!player) {
            this._gameState.resetTurn();
            this.secondRound();
            return;
        }

        this._gameLogger.setCurrentBet(this._gameState.getCurrentBet().getValue());
        player.betting(this._gameLogger.getLog()).then((command) => {
            if (command == CommandType.Fold) {
                this._gameState.fold(player);
            } else if (command == CommandType.Raise) {
                if (!this._gameState.checkAndSetBust(player)) {
                    this._gameState.raise(player);
                }
            } else if (command == CommandType.See) {
                if (!this._gameState.checkAndSetBust(player)) {
                    this._gameState.see(player);
                }
            }
            this._gameLogger.setCurrentBet(this._gameState.getCurrentBet().getValue());
            this._gameLogger.addFirstRound(player.getName(), command);
            this.firstRound();
        }).catch((error) => {
            console.log(error);
        });
    }

    private secondRound() {
        let player = this._gameState.getNextPlayer();
        if (this._gameState.isGameOver()) {
            this.endRound();
            return;
        }
        if (!player) {
            this._gameState.resetTurn();
            this.thirdRound();
            return;
        }
        player.discard(this._gameLogger.getLog()).then((command) => {
            this._gameState.discard(player, command);
            this._gameLogger.addSecondRound(player.getName(), command.length);
            this.secondRound();
        }).catch((error) => {
            console.log(error);
        });
    }


    private thirdRound() {
        let player = this._gameState.getNextPlayer();
        if (this._gameState.isGameOver()) {
            this.endRound();
            return;
        }
        if (!player) {
            this._gameState.resetTurn();
            this.showdownRound();
            return;
        }
        player.betting(this._gameLogger.getLog()).then((command) => {
            if (command == CommandType.Fold) {
                this._gameState.fold(player);
            } else if (command == CommandType.Raise) {
                if (!this._gameState.checkAndSetBust(player)) {
                    this._gameState.raise(player);
                }
            } else if (command == CommandType.See) {
                if (!this._gameState.checkAndSetBust(player)) {
                    this._gameState.see(player);
                }
            }
            this._gameLogger.setCurrentBet(this._gameState.getCurrentBet().getValue());
            this._gameLogger.addThirdRound(player.getName(), command);
            this.thirdRound();
        }).catch((error) => {
            console.log(error);
        });
    }

    private showdownRound() {
        let player = this._gameState.getNextPlayer();
        if (this._gameState.isGameOver()) {
            this.endRound();
            return;
        }
        if (!player) {
            this._gameState.resetTurn();
            this.endRound();
            return;
        }
        player.showdown(this._gameLogger.getLog()).then((command) => {
            let cards: ICard[] = [];
            if (command == EndGameType.Lose) {
                this._gameState.fold(player);
                player.endTurn(this._gameLogger.getLog(), EndGameType.Lose);
            } else if (command == EndGameType.Show) {
                cards = this._gameState.showCards(player);
                this._gameState.playerPushCardsToCheckWon(player);
            }
            this._gameLogger.addFourthRound(player.getName(), command, cards);
            this.showdownRound();
        }).catch((error) => {
            console.log(error);
        });
    }

    private endRound() {
        let player = this._gameState.getWon();
        this._gameState.won(player);
        this._gameLogger.finishRound();
    }
}