import * as _ from 'lodash';

import {
    SuitType, CommandType, ICard, IDeck, IPlayer, ICommand,
    IPokerChip, IHand, SIZE_OF_HANDS, GameEndState, START_MONEY,
    RAISE_AMOUNT, Bust, Discard, End, Fold, Raise, See, Show,
    PlayerState, START_BET
} from '../../interfaces';
import { PokerChip } from '../poker-objects/PokerChip';
import { DeckFactory } from '../poker-objects/DeckFactory';
import { HandTool } from '../poker-objects/HandTool';
import { Deck } from '../poker-objects/Deck';
import { Hand } from '../poker-objects/Hand';

interface IPlayerGame {
    name: string
    wallet: IPokerChip,
    hand: IHand,
    status: PlayerState,
}

export class GameState {
    private _startDate: Date;
    private _noOfGames: number;
    private handTool: HandTool = new HandTool();

    private _deck: Deck;

    private _pool: IPokerChip;
    private _currentBet: IPokerChip;

    private _players: {
        [key: string]: IPlayerGame
    } = {};
    private _playerNames: string[] = [];

    constructor(names: string[]) {
        this._startDate = new Date();
        this._noOfGames = 0;

        let cards = DeckFactory.createStandardCards();
        this._deck = new Deck(cards);

        this._players = {};
        _.forEach(names, (name) => {
            let user: IPlayerGame = {
                name: name,
                wallet: new PokerChip(START_MONEY),
                hand: undefined,
                status: PlayerState.Playing
            }
            if (this._players[name]) {
                throw new Error('Names of the players must be unique.');
            }
            this._players[name] = user;
        });
        this._playerNames = _.slice(names);
    }

    public dealPlayers() {
        this._pool = new PokerChip();
        this._currentBet = new PokerChip(START_BET);

        this._deck.reset();
        this._deck.shuffle();
        _.forEach(this._players, (user) => {
            let dealtCards = this._deck.dealCard(SIZE_OF_HANDS);
            user.hand = new Hand(dealtCards, new HandTool());
            user.status = PlayerState.Playing;
        });

        this._noOfGames++;
    }

    public discard(name: string, cardIndexes: number[]) {
        let player = this._players[name];

        _.forEach(cardIndexes, (cardIndex, i) => {
            let newCard = this._deck.dealCard();
            let discardedCard = player.hand.discardAndReceive(cardIndex, newCard[0]);
            this._deck.returnCard(discardedCard);
        });

        return new Discard(name, cardIndexes.length);
    }

    public raise(name: string) {
        let player = this._players[name];
        this._currentBet = this._currentBet.add(new PokerChip(RAISE_AMOUNT));

        let amount = this._currentBet;
        player.wallet = player.wallet.subtract(this._currentBet);
        this._pool = this._pool.add(amount);

        return new Raise(name, amount.getValue());
    }

    public see(name: string) {
        let player = this._players[name];
        let amount = this._currentBet;
        player.wallet = player.wallet.subtract(this._currentBet);
        this._pool = this._pool.add(amount);

        return new See(name, amount.getValue());
    }

    public fold(name: string) {
        let player = this._players[name];
        player.status = PlayerState.Fold;

        return new Fold(name);
    }

    public show(name: string) {
        let player = this._players[name];
        return new Show(name, player.hand);
    }

    public end() {
        let endList: End[] = [];
        let winner: IPlayerGame;

        let names = _.keysIn(this._players);
        let players = _.map(names, (name) => {
            let player = this._players[name];
            return player;
        })

        let playersPlaying = _.filter(players, (player) => {
            return player.status == PlayerState.Playing;
        })

        if (playersPlaying.length == 1) {
            winner = playersPlaying[0];
        } else {
            let playerOrder = _.sortBy(playersPlaying, (player) => {
                return this.handTool.getGameValue(player.hand);
            });

            endList = _.times(playerOrder.length - 1, (i) => {
                let player = playerOrder[i];
                return new End(player.name, GameEndState.Lost, player.wallet.getValue());
            })
            winner = playerOrder[playerOrder.length - 1];
        }

        winner.wallet = winner.wallet.add(this._pool);
        this._pool = new PokerChip();
        endList.push(new End(winner.name, GameEndState.Won, winner.wallet.getValue()));
        return endList;
    }

    public getBustedPlayer(): string[] {
        return _.filter(this._playerNames, (name) => {
            let player = this._players[name];
            return player.status == PlayerState.Bust;
        });
    }

    public getPlayers(): string[] {
        return _.keysIn(this._players);
    }

    public getCurrentBet(): IPokerChip {
        return this._currentBet;
    }

    public checkAndSetBust(name: string) {
        let player = this._players[name];
        let playerMoney = player.wallet.getValue();
        let currentBet = this._currentBet.getValue();

        if (playerMoney < currentBet) {
            player.status = PlayerState.Bust;
            return new Bust(name);
        }

        return undefined;
    }

    public getPlayerGame(name: string) {
        return this._players[name];
    }

    private index: number = 0;
    public getNextPlayer(): string {
        if (this.index >= this._playerNames.length) {
            return undefined;
        }

        let name = this._playerNames[this.index];
        let playerGame = this._players[name];
        while (playerGame.status != PlayerState.Playing
            && this.index < this._playerNames.length - 1) {
            this.index++;
            name = this._playerNames[this.index];
            playerGame = this._players[name];
        }
        this.index++;
        return name;
    }

    public resetTurn(): void {
        this.index = 0;
    }

    public isGameOver(): boolean {
        let playersPlaying = _.filter(this._playerNames, (name) => {
            let player = this._players[name];
            return player.status == PlayerState.Playing;
        });
        return playersPlaying.length == 1;
    }

    public removePlayer(name: string): void {
        _.pull(this._playerNames, name);
        _.unset(this._players, name);
    }

    public isInTheGame(name: string) {
        let player = this._players[name];
        return player ? true : false;
    }
}