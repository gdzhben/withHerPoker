import * as _ from 'lodash';

import {
    IPlayer, IPlayerGame, START_MONEY, BettingType, RAISE_AMOUNT,
    IPokerChip, ShowDownType, ICard, Info, GameOverState, GameEndState, START_BET, End, IMongoDb, IGameData
} from '../../interfaces';
import { PokerChip } from '../poker-objects/PokerChip'
import { PokerGame } from './PokerGame'
import { GameLog } from './GameLog'
import { HumanPlayer } from '../player/HumanPlayer'

export class Dealer {

    private _pokerGame: PokerGame;
    private _players: {
        [key: string]: IPlayer
    } = {};
    private log: GameLog = new GameLog();
    private _hasGameEnded = false;
    private rounds = 0;
    private startDate = new Date(Date.now());


    private bettingIndex = 0;
    private discardIndex = 0;
    private showDownIndex = 0;
    private playAgainIndex = 0;

    constructor(players: IPlayer[], private mongo: IMongoDb) {
        this._pokerGame = new PokerGame();
        if (players && players.length !== 5) {
            throw new Error("must have 5 players in order to play.");
        }

        this._players = {};
        _.forEach(players, (player) => {
            this._players[player.getName()] = player;
        });
    }

    public play(): void {
        this.bettingIndex = 0;
        this.discardIndex = 0;
        this.showDownIndex = 0;

        this.log = new GameLog();

        let temp = new PokerGame();
        _.forOwn(this._players, (player, name) => {
            let info = this._pokerGame.info(name)
            let result;
            if (info) {
                result = temp.dealPlayers(name, info.wallet);
            } else {
                result = temp.dealPlayers(name, new PokerChip(START_MONEY));
            }
            let playerInfo = temp.getPlayerInfo(name);
            player.dealCards(result.hand, playerInfo);
        })

        this._pokerGame = temp;
        this.rounds++;
        this.firstRound();
    }

    public hasGameEnded(): boolean {
        return this._hasGameEnded;
    }

    private firstRound() {
        let playerName = this._pokerGame.getNextPlayer();
        let player = this._players[playerName];

        if (this._pokerGame.isGameOver()) {
            this.endRound();
            return;
        }
        let playerInfo = this._pokerGame.getPlayerInfo(playerName);
        player.betting(this.log.getLog(), playerInfo)
            .then((command) => {
                this._bettingRound(playerName, player, command);

                if (this.bettingIndex == this._pokerGame.getPlayersPlaying().length) {
                    this.bettingIndex = 0;
                    this.secondRound();
                } else {
                    this.firstRound();
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    private secondRound() {
        let playerName = this._pokerGame.getNextPlayer();
        let player = this._players[playerName];

        if (this._pokerGame.isGameOver()) {
            this.endRound();
            return;
        }
        let playerInfo = this._pokerGame.getPlayerInfo(playerName);
        player.discard(this.log.getLog(), playerInfo)
            .then((command) => {
                this._discardRound(playerName, player, command);

                if (this.discardIndex == this._pokerGame.getPlayersPlaying().length) {
                    this.discardIndex = 0;
                    this.thirdRound();
                    return;
                } else {
                    this.secondRound();
                }
            }).catch((error) => {
                console.log(error);
            });
    }


    private thirdRound() {
        let playerName = this._pokerGame.getNextPlayer();
        let player = this._players[playerName];

        if (this._pokerGame.isGameOver()) {
            this.endRound();
            return;
        }
        let playerInfo = this._pokerGame.getPlayerInfo(playerName);
        player.betting(this.log.getLog(), playerInfo)
            .then((command) => {
                this._bettingRound(playerName, player, command);

                if (this.bettingIndex == this._pokerGame.getPlayersPlaying().length) {
                    this.bettingIndex = 0;
                    this.showdownRound();
                    return;
                } else {
                    this.thirdRound();
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    private showdownRound() {
        let playerName = this._pokerGame.getNextPlayer();
        let player = this._players[playerName];

        if (this._pokerGame.isGameOver()) {
            this.endRound();
            return;
        }

        let playerInfo = this._pokerGame.getPlayerInfo(playerName);
        player.showdown(this.log.getLog(), playerInfo)
            .then((command) => {
                this._showDownRound(playerName, player, command);

                if (this.showDownIndex == this._pokerGame.getPlayersPlaying().length) {
                    this.showDownIndex = 0;
                    this.endRound();
                } else {
                    this.showdownRound();
                }
            }).catch((error) => {
                console.log(error);
            });
    }

    private endRound() {
        let result = this._pokerGame.result();
        _.forEach(result, (elem) => {
            this.log.log(elem);
        });

        //remove bust players
        let resulLeft = _.filter(result, (elem) => {
            if (elem.chipsLeft < START_BET) {
                this._pokerGame.removePlayer(elem.name);
                this._players[elem.name].gameOver(GameOverState.Bust, elem.chipsLeft);
                _.unset(this._players, elem.name);
                this.save(elem.name, "bust", elem.chipsLeft);
                return false;
            }
            this._pokerGame.setPlaying(elem.name);
            return true;
        });

        if (resulLeft.length == 1) {
            if (this._hasHumanPlayer()) {
                _.values(this._players)[0].gameOver(GameOverState.Bust, resulLeft[0].chipsLeft);
                this.save(_.values(this._players)[0].getName(), "bust", resulLeft[0].chipsLeft);
            } else {
                this._hasGameEnded = true;
            }
        } else {
            if (this._hasHumanPlayer()) {
                this.playAgain(resulLeft);
            } else {
                this._hasGameEnded = true;
            }
        }
    }

    private save(name: string, endType: string, chipsLeft: number) {
        let gameData: IGameData = {
            endChips: chipsLeft,
            endState: endType,
            endTime: new Date(Date.now()),
            numberOfRounds: this.rounds,
            startChips: START_MONEY,
            startTime: this.startDate,
            username: name
        };
        this.mongo.addGameData(gameData);
    }

    private playAgain(result: End[]) {
        let playerName = this._pokerGame.getNextPlayer();
        let player = this._players[playerName];
        if (result.length == this.playAgainIndex && this._hasHumanPlayer()) {
            this.playAgainIndex = 0;
            this.restart();
            return;
        }

        let playerInfo = this._pokerGame.getPlayerInfo(playerName);
        player.endTurn(this.log.getLog(), playerInfo).then((command) => {
            if (!command) {
                _.unset(this._players, playerName);
                player.gameOver(GameOverState.Quit, playerInfo.wallet.getValue());
                this.save(playerName, "folds", playerInfo.wallet.getValue());
            }
            this.playAgainIndex++;
            this.playAgain(result);
        }).catch((error) => {
            console.log(error);
        });
    }

    private restart() {
        if (this._hasHumanPlayer()) {
            this.play();
        } else {
            this._hasGameEnded = true;
        }
    }

    private _bettingRound(playerName: string, player: IPlayer, command: BettingType) {
        let result: Info;
        if (command == BettingType.Fold) {
            result = this._pokerGame.fold(playerName);
        } else if (command == BettingType.Raise) {
            result = this._pokerGame.raise(playerName);
            this.bettingIndex = 1;
        } else {
            result = this._pokerGame.see(playerName);
            this.bettingIndex++;
        }
        this.log.log(result);
    }

    private _discardRound(playerName: string, player: IPlayer, command: number[]) {
        let result: Info;
        result = this._pokerGame.discard(playerName, command);
        this.log.log(result);

        let playerGame = this._pokerGame.info(playerName);
        this.discardIndex++;

        player.dealCards(playerGame.hand, this._pokerGame.getPlayerInfo(playerName));
    }

    private _showDownRound(playerName: string, player: IPlayer, command: ShowDownType) {
        let result: Info;
        if (command == ShowDownType.Fold) {
            result = this._pokerGame.fold(playerName);
        } else if (command == ShowDownType.Show) {
            result = this._pokerGame.show(playerName);
        }
        this.showDownIndex++;
        this.log.log(result);
    }

    private _hasHumanPlayer() {
        let yes = false;
        _.forOwn(this._players, (player) => {
            if (player instanceof HumanPlayer) {
                yes = true;
            }
        })
        return yes;
    }
}