import * as _ from 'lodash';

import {
    IPlayer, IPlayerGame, START_MONEY, CommandType, RAISE_AMOUNT,
    IPokerChip, EndGameType, ICard, Info
} from '../../interfaces';
import { PokerChip } from '../poker-objects/PokerChip'
import { GameState } from './GameState'
import { GameLog } from './GameLog'
import { HumanPlayer } from '../player/HumanPlayer'

export class Dealer {

    private _gameState: GameState;
    private _players: {
        [key: string]: IPlayer
    } = {};
    private log: GameLog = new GameLog();
    private _hasGameEnded = false;

    constructor(players: IPlayer[]) {
        if (players && players.length !== 5) {
            throw new Error("must have 5 players in order to play.");
        }

        let playerNames = _.map(players, (player) => {
            return player.getName();
        });
        this._gameState = new GameState(playerNames);

        this._players = {};
        _.forEach(players, (player) => {
            this._players[player.getName()] = player;
        });
    }

    public play(): void {
        this._gameState.dealPlayers();
        this.firstRound();
    }

    public hasGameEnded(): boolean {
        return this._hasGameEnded;
    }

    private firstRound() {
        let playerName = this._gameState.getNextPlayer();
        let player = this._players[playerName];

        if (this._gameState.isGameOver()) {
            this.endRound();
            return;
        }
        if (!player) {
            this._gameState.resetTurn();
            this.secondRound();
            return;
        }

        let playerGame = this._gameState.getPlayerGame(playerName);
        player.dealCards(playerGame.hand);

        player.betting(this.log.getLog()).then((command) => {
            let result: Info;
            if (command == CommandType.Fold) {
                result = this._gameState.fold(playerName);
            } else if (command == CommandType.Raise) {
                result = this._gameState.checkAndSetBust(playerName);
                if (!result) {
                    result = this._gameState.raise(playerName);
                }
            } else if (command == CommandType.See) {
                result = this._gameState.checkAndSetBust(playerName);
                if (!result) {
                    result = this._gameState.see(playerName);
                }
            }
            this.log.log(result);
            this.firstRound();
        }).catch((error) => {
            console.log(error);
        });
    }

    private secondRound() {
        let playerName = this._gameState.getNextPlayer(); let player = this._players[playerName];
        if (this._gameState.isGameOver()) {
            this.endRound();
            return;
        }
        if (!player) {
            this._gameState.resetTurn();
            this.thirdRound();
            return;
        }
        player.discard(this.log.getLog()).then((command) => {
            let result: Info;
            result = this._gameState.discard(playerName, command);
            this.log.log(result);

            let playerGame = this._gameState.getPlayerGame(playerName);
            player.dealCards(playerGame.hand);

            this.secondRound();
        }).catch((error) => {
            console.log(error);
        });
    }


    private thirdRound() {
        let playerName = this._gameState.getNextPlayer();
        let player = this._players[playerName];
        if (this._gameState.isGameOver()) {
            this.endRound();
            return;
        }
        if (!player) {
            this._gameState.resetTurn();
            this.showdownRound();
            return;
        }
        player.betting(this.log.getLog()).then((command) => {
            let result: Info;
            if (command == CommandType.Fold) {
                result = this._gameState.fold(playerName);
            } else if (command == CommandType.Raise) {
                result = this._gameState.checkAndSetBust(playerName);
                if (!result) {
                    result = this._gameState.raise(playerName);
                }
            } else if (command == CommandType.See) {
                result = this._gameState.checkAndSetBust(playerName);
                if (!result) {
                    result = this._gameState.see(playerName);
                }
            }
            this.log.log(result);
            this.thirdRound();
        }).catch((error) => {
            console.log(error);
        });
    }

    private showdownRound() {
        let playerName = this._gameState.getNextPlayer();
        let player = this._players[playerName];
        if (this._gameState.isGameOver()) {
            this.endRound();
            return;
        }
        if (!player) {
            this._gameState.resetTurn();
            this.endRound();
            return;
        }
        player.showdown(this.log.getLog()).then((command) => {
            let result: Info;
            if (command == EndGameType.Fold) {
                result = this._gameState.fold(playerName);
            } else if (command == EndGameType.Show) {
                result = this._gameState.show(playerName);
            }
            this.log.log(result);
            this.showdownRound();
        }).catch((error) => {
            console.log(error);
        });
    }

    private endTurnArray: string[] = [];
    private endRound() {
        let result = this._gameState.end();
        _.forEach(result, (elem) => {
            this.log.log(elem);
        });
        this.endTurnArray = [];
        this.playAgain();
    }

    private playAgain() {
        let playerName = this._gameState.getNextPlayer();
        let player = this._players[playerName];
        if (!player) {
            this._gameState.resetTurn();
            this.restart();
            return;
        }
        player.endTurn(this.log.getLog()).then((command) => {
            let result: Info;
            if (command) {
                this.endTurnArray.push(playerName);
            }
            this.playAgain();
        }).catch((error) => {
            console.log(error);
        });
    }

    private restart() {
        if (this.endTurnArray.length >= 1) {
            if (this._isThereHumanPlayer()) {
            }
        }
        this._hasGameEnded = true;
    }

    private _isThereHumanPlayer(): boolean {
        let yes = false;
        _.forEach(this.endTurnArray, (name) => {
            let player = this._players[name];
            if (player instanceof HumanPlayer) {
                yes = true;
            }
        })
        return yes;
    }
}