import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';


import {
    HandType, BettingType, ShowDownType, SuitType, IPlayer, IGameInfo, PlayerInfo, GameOverState, IHand
    , RAISE_AMOUNT, START_BET
} from '../../interfaces';
import { HandTool } from '../poker-objects/HandTool';

export class AI implements IPlayer {
    private bluffAbility: number;
    private riskAversion: number;
    private name: string;

    private gameInfo: any;
    private myInfo: PlayerInfo;
    private hand: IHand;
    private round: number;

    constructor(name: string, bluffAbility: number, riskAversion: number) {
        this.name = name;
        this.bluffAbility = bluffAbility;
        this.riskAversion = riskAversion;
        this.round = 1;
    }

    public getName(): string {
        return this.name;
    }

    public dealCards(hand: IHand, info: PlayerInfo): void {
        this.hand = hand;
        this.myInfo = info;
        
        if (info.currentBet.getValue() == START_BET) {
            this.round = 0;
        }
    }

    public betting(gameInfo: IGameInfo, info: PlayerInfo): Promise<BettingType> {
        this.myInfo = info;

        let ratings: number[] = [
            this.getSeeRating() / this.round,
            this.getRaiseRating() / ((this.round + 1) ** (2)),
            this.getFoldRating()
        ];
        let max = 0;
        let outputCommand = BettingType.Fold;

        if (this.myInfo.wallet.getValue() > this.myInfo.currentBet.getValue() + RAISE_AMOUNT) {
            let max = _.max(ratings);
            let index = _.indexOf(ratings, max);
            if (index == 0) {
                outputCommand = BettingType.See;
            } else if (index == 1) {
                outputCommand = BettingType.Raise;
            }
        }
        this.round++;
        return Promise.resolve(outputCommand);
    }

    public discard(gameInfo: IGameInfo, info: PlayerInfo): Promise<number[]> {
        this.myInfo = info;

        let noOfCardsToBe = Math.floor(Math.random() * 3);
        let prob = _.times(this.hand.size(), (i) => {
            return this.getDiscardProbability(i, this.hand);
        })
        let indexes: number[] = [];

        _.times(noOfCardsToBe, () => {
            let number = Math.random();
            let p = _.max(prob);
            if (p > number) {
                let index = _.indexOf(prob, p);
                prob[index] = -1; //removing that value
                indexes.push(index);
            }
        })
        return Promise.resolve(indexes);
    }

    public showdown(gameInfo: IGameInfo, info: PlayerInfo): Promise<ShowDownType> {
        this.myInfo = info;

        let command: ShowDownType;
        if (this.hand.getHandType() > 7) {
            command = ShowDownType.Fold;
        } else {
            command = ShowDownType.Show;
        }

        return Promise.resolve(command);
    }

    public endTurn(gameInfo: IGameInfo, info: PlayerInfo): Promise<boolean> {
        this.myInfo = info;
        return Promise.resolve(true);
    }

    public gameOver(game: GameOverState, money?: number): void {

    }

    private getSeeRating(): number {
        let rating = 0;

        switch (this.hand.getHandType()) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                rating += (this.bluffAbility / 10);
                rating += (this.riskAversion / 10);
            case 5:
                rating += 1;
                rating += (this.bluffAbility / 9) + 1;
                rating += (this.riskAversion / 10) + 1;
                break;
            case 6:
                rating += 3;
                rating += (this.bluffAbility / 7) + 1;
                rating += (this.riskAversion / 6) + 1;
                break;
            case 7:
                rating += 4;
                rating += (this.bluffAbility / 6) + 1;
                rating += (this.riskAversion / 5) + 1;
                break;
            case 8:
                rating += (this.bluffAbility / 5) + 1;
                rating += (this.riskAversion / 2) + 1;
            case 9:
                rating += 8;
                rating += (this.bluffAbility / 4) - 1;
                rating += (this.riskAversion - 1);
                break;
        }

        return rating;
    }

    private getRaiseRating(): number {
        let rating = 0;

        switch (this.hand.getHandType()) {
            case 0:
            case 1:
            case 2:
            case 3:
                rating += 10;
                rating += this.bluffAbility;
                rating += this.riskAversion;
                break;
            case 4:
                rating += this.bluffAbility - 1;
                rating += this.riskAversion - 2;
            case 5:
                rating += 9;
                rating += this.bluffAbility - 1;
                rating += this.riskAversion - 2;
                break;
            case 6:
                rating += 7;
                rating += this.bluffAbility - 3;
                rating += this.riskAversion - 4;
                break;
            case 7:
                rating += 6;
                rating += this.bluffAbility - 4;
                rating += this.riskAversion - 5;
                break;
            case 8:
                rating += 3;
                rating += (this.bluffAbility / 4);
                rating += (this.riskAversion / 6);
                break;
            case 9:
                rating += 1;
                rating += (this.bluffAbility / 8);
                rating += (this.riskAversion / 10);
                break;
        }

        return rating;
    }

    private getFoldRating(): number {
        let rating = 0;

        switch (this.hand.getHandType()) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                rating += this.bluffAbility / 10;
                rating += this.riskAversion / 10;
            case 5:
                rating += 1;
                rating += this.bluffAbility / 9;
                rating += this.riskAversion / 10;
                break;
            case 6:
                rating += 2;
                rating += this.bluffAbility / 7;
                rating += this.riskAversion / 6;
                break;
            case 7:
                rating += 3;
                rating += this.bluffAbility / 6;
                rating += this.riskAversion / 5;
                break;
            case 8:
                rating += 7;
                rating += this.bluffAbility / 5;
                rating += this.riskAversion / 2;
                break;
            case 9:
                rating += 9;
                rating += this.bluffAbility / 4;
                rating += this.riskAversion;
                break;
        }

        return rating;
    }

    private getDiscardProbability(cardIndex: number, hand: IHand): number {
        const highestFaceValue = 14;
        const divisor = 12;
        let handTool = new HandTool();
        let handType = this.hand.getHandType();
        let maxCard = handTool.getHighestCard(this.hand.cards());
        let faceCount = handTool.createFaceCount(this.hand.cards());
        let card = this.hand.getCard(cardIndex);
        let cardFaceValue = card.getFaceValue();

        if (handType == HandType.RoyalFlush) {
            return 0;
        }

        if (handType == HandType.StraightFlush) {
            return (highestFaceValue - maxCard.getFaceValue()) / ((cardIndex + 1) * divisor * 4);
        }

        if (handType == HandType.FourOfAKind) {
            if (faceCount[cardFaceValue] == 4) {
                return (highestFaceValue - cardFaceValue) / (divisor * 4);
            } else {
                return (highestFaceValue - cardFaceValue) / highestFaceValue;
            }
        }

        if (handType == HandType.FullHouse) {
            if (faceCount[cardFaceValue] == 3) {
                return (highestFaceValue - cardFaceValue) / (divisor * 3);
            } else {
                return (highestFaceValue - cardFaceValue) / highestFaceValue;
            }
        }

        if (handType == HandType.Flush) {
            return (highestFaceValue - cardFaceValue) / (divisor * 2);
        }

        if (handType == HandType.Straight) {
            return (highestFaceValue - maxCard.getFaceValue()) / ((cardIndex + 1) * divisor * 2);
        }

        if (handType == HandType.ThreeOfAKind) {
            if (faceCount[cardFaceValue] == 3) {
                return (highestFaceValue - cardFaceValue) / (divisor);
            } else {
                return (highestFaceValue - cardFaceValue) / highestFaceValue;
            }
        }

        if (handType == HandType.TwoPairs) {
            if (faceCount[cardFaceValue] == 2) {
                return (highestFaceValue - cardFaceValue) / (divisor * 2.5);
            } else {
                return (highestFaceValue - cardFaceValue) / highestFaceValue;
            }
        }

        if (handType == HandType.OnePair) {
            if (faceCount[cardFaceValue] == 2) {
                return (highestFaceValue - cardFaceValue) / (divisor * 2);
            } else {
                return (highestFaceValue - cardFaceValue) / highestFaceValue;
            }
        }

        if (handType == HandType.HighHand) {
            return (highestFaceValue - cardFaceValue) / (highestFaceValue * (7 - cardIndex));
        }

        return 1;
    }
}