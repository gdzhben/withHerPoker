import * as _ from 'lodash';

import {
    SuitType, CommandType, ICard, IDeck, IPlayer, ICommand,
    IPokerChip, IHand, SIZE_OF_HANDS, GameEndState, START_MONEY,
    IPlayerGame, RAISE_AMOUNT, IBettingRound, IDiscardingRound, IShowdownRound,
    PlayerState
} from '../../interfaces';
import { PokerChip } from '../poker-objects/PokerChip';
import { DeckFactory } from '../poker-objects/DeckFactory';
import { Deck } from '../poker-objects/Deck';
import { Hand } from '../poker-objects/Hand';
import { Decks } from '../poker-objects/Decks';

export class GameState {
    private _startDate: Date = new Date();
    private _noOfGames: number = 1;

    private _deck: Decks;

    private _pool: IPokerChip;
    private _currentBet: IPokerChip;

    private _players: IPlayerGame[] = [];

    constructor(players: IPlayer[]) {
        this._deck = new Decks(DeckFactory.createStandardCards());

        this._pool = new PokerChip();
        this._currentBet = new PokerChip();
        this._startDate = new Date();

        _.forEach(players, (player) => {
            let user: IPlayerGame = {
                player: player,
                wallet: new PokerChip(START_MONEY),
                noDiscardedCard: 0,
                hand: undefined,
                status: PlayerState.Playing
            }
            this._players.push(user);
        });
    }

    public dealPlayers() {
        this._deck.reset();
        this._deck.shuffle();

        _.forEach(this._players, (user) => {
            let dealtCards = this._deck.dealCard(SIZE_OF_HANDS);
            user.hand = new Hand(dealtCards);
            user.noDiscardedCard = 0;
            user.player.dealCards(user.hand);
            user.status = PlayerState.Playing;
        });
        this._noOfGames++;
    }

    public discard(player: IPlayer, cardIndexes: number[]) {
        let user = this._findUserPlaying(player);
        let newCards = this._deck.dealCard();
        _.forEach(cardIndexes, (cardIndex, i) => {
            let discardedCard = user.hand.discardAndReceive(cardIndex, newCards[i]);
            this._deck.returnCard(discardedCard);
        });
    }

    public raise(player: IPlayer) {
        let playerGame = this._findUserPlaying(player);
        let raiseAmount = this._currentBet.add(new PokerChip(RAISE_AMOUNT));
        playerGame.wallet = playerGame.wallet.subtract(raiseAmount);
        this._pool = this._pool.add(raiseAmount);
    }

    public see(player: IPlayer) {
        let playerGame = this._findUserPlaying(player);
        let amount = this._currentBet;
        playerGame.wallet = playerGame.wallet.subtract(amount);
        this._pool = this._pool.add(amount);
    }

    public fold(player: IPlayer): void {
        let playerGame = this._findUserPlaying(player);
        playerGame.status = PlayerState.Fold;
    }

    public showCards(player: IPlayer): ICard[] {
        let playerGame = this._findUserPlaying(player);
        return playerGame.hand.cards();
    }

    public won(player: IPlayer) {
        let playerGame = this._findUserPlaying(player);
        playerGame.wallet = playerGame.wallet.add(this._pool);
        this._pool = new PokerChip();
    }

    public getPlayers(): IPlayer[] {
        let players = _.map(this._players, (playerGame) => {
            return playerGame.player;
        });
        return _.slice(players);
    }

    public getCurrentBet(): IPokerChip {
        return this._currentBet;
    }

    public checkAndSetBust(player: IPlayer): boolean {
        let playerGame = this._findUserPlaying(player);
        let playerMoney = playerGame.wallet.getValue();
        let currentBet = this._currentBet.getValue();

        if (playerMoney < currentBet) {
            playerGame.status = PlayerState.Bust;
            return true;
        }

        return false;
    }

    private index: number = 0;
    public getNextPlayer(): IPlayer {
        if (this.index >= this._players.length) {
            return undefined;
        }

        let playerGame = this._players[this.index];
        while (playerGame.status != PlayerState.Playing && this.index < this._players.length - 1) {
            this.index++;
            playerGame = this._players[this.index];
        }
        this.index++;
        return playerGame.player;
    }

    public resetTurn(): void {
        this.index = 0;
    }

    public isGameOver(): boolean {
        let playersPlaying = _.filter(this._players, (player) => {
            return player.status == PlayerState.Playing;
        });
        return playersPlaying.length == 1;
    }

    public removePlayer(player: IPlayer): void {
        let playerGame = this._findUserPlaying(player);
        _.pull(this._players, playerGame);
    }

    private _findUserPlaying(player: IPlayer): IPlayerGame {
        return _.find(this._players, (user) => {
            return _.isEqual(player.getName(), user.player.getName());
        });
    }
}
