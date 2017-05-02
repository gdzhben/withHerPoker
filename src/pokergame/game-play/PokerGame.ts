import * as _ from 'lodash';

import {
    SuitType, BettingType, ICard, IDeck, IPlayer, ICommand,
    IPokerChip, IHand, SIZE_OF_HANDS, GameEndState, START_MONEY,
    RAISE_AMOUNT, Bust, Discard, End, Fold, Raise, See, Show,
    PlayerState, START_BET, PlayerInfo
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

export class PokerGame {
    private handTool: HandTool = new HandTool();

    private _deck: Deck;

    private _pool: IPokerChip;
    private _currentBet: IPokerChip;

    private _players: {
        [key: string]: IPlayerGame
    } = {};

    private _order: string[] = [];

    constructor() {
        let cards = DeckFactory.createStandardCards();
        this._deck = new Deck(cards);
        this._pool = new PokerChip();
        this._currentBet = new PokerChip(START_BET);
    }

    public dealPlayers(name: string, wallet: IPokerChip) {
        let player = this._players[name];
        if (player) {
            throw new Error('Player already being dealt!');
        }
        if (wallet.getValue() < START_BET) {
            throw new Error(`Player should have atleast ${START_BET} chip(s).`);
        }

        let dealtCards = this._deck.dealCard(SIZE_OF_HANDS);
        player = {
            name: name,
            hand: new Hand(dealtCards, new HandTool()),
            wallet: wallet,
            status: PlayerState.Playing
        };

        this._players[name] = player;
        this._order.push(name);
        return player;
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

    public result() {
        let endList: End[] = [];
        let winner: IPlayerGame;

        let players = _.values(this._players);

        let playersPlaying = _.filter(players, (player) => {
            return player.status == PlayerState.Playing;
        })

        let playersFolded = _.filter(players, (player) => {
            return player.status == PlayerState.Fold;
        })

        let foldedList = _.map(playersFolded, (player) => {
            return new End(player.name, GameEndState.Fold, player.wallet.getValue());
        })
        endList = _.concat(endList, foldedList);

        playersPlaying = _.sortBy(playersPlaying, (player) => {
            return this.handTool.getGameValue(player.hand);
        });

        winner = playersPlaying.pop();
        winner.wallet = winner.wallet.add(this._pool);
        this._pool = new PokerChip();
        endList.push(new End(winner.name, GameEndState.Won, winner.wallet.getValue()));

        let list = _.map(playersPlaying, (player) => {
            return new End(player.name, GameEndState.Lost, player.wallet.getValue());
        })
        endList = _.concat(endList, list);

        return endList;
    }

    public getPlayersPlaying(): string[] {
        let names = _.keys(this._players);
        return _.filter(names, (name) => {
            return this._players[name].status == PlayerState.Playing;
        })
    }

    public getCurrentBet(): IPokerChip {
        return this._currentBet;
    }

    public info(name: string) {
        return this._players[name];
    }

    public getPlayerInfo(name: string): PlayerInfo {
        return {
            currentBet: this._currentBet,
            name: name,
            wallet: this._players[name].wallet
        };
    }

    public removePlayer(name: string): void {
        _.unset(this._players, name);
    }


    public isGameOver(): boolean {
        let players = _.values(this._players);
        let playersPlaying = _.filter(players, (player) => {
            return player.status == PlayerState.Playing;
        });
        return playersPlaying.length == 1;
    }

    public giveChip(name: string, money: IPokerChip) {
        let player = this._players[name];
        player.wallet = player.wallet.add(money);
    }

    private index = 0;
    public getNextPlayer(): string {
        let playerNames = this._order;
        if (this.index >= playerNames.length) {
            return undefined;
        }

        let name = playerNames[this.index];
        let playerGame = this._players[name];
        while (playerGame.status != PlayerState.Playing) {
            this.index = (this.index + 1) % playerNames.length;
            this
            name = playerNames[this.index];
            playerGame = this._players[name];
        }
        this.index = (this.index + 1) % playerNames.length;
        return name;
    }

    public setPlaying(name: string) {
        let player = this._players[name];
        player.status = PlayerState.Playing;
    }
}