import { IAI } from './IAI';
import { HandType } from '../types/HandType';

export class AI implements IAI {
    private bluffAbility: number;
    private riskAversion: number;
    private gameInfo: any;
    private myInfo: any;

    constructor(gameInfo: any, myInfo: any) {
        this.bluffAbility = Math.floor((Math.random() * 10) + 1);
        this.riskAversion = Math.floor((Math.random() * 10) + 1);
        
        this.gameInfo = gameInfo;
        this.myInfo = myInfo;
    }

    public yourTurn(dealer: any) {

        // Check if command is valid.
        if (dealer.giveCommand()) {

        } else {

        }
    }

    // Argument for raise command.
    // Bet should be in proportion with hand rank.
    // bet = (hand rank / 10) * totalChips.
    // e.g. HighHand: (0 / 10) * totalChips = 0.
    private betAmount(): number {
        let bet = (this.myInfo.getHandType() / HandType.HighHand)  * this.myInfo.totalChips();

        return bet;
    }

    // Return string corresponding to command with highest rating.
    public getTurnCommand(): string {
        let ratings = [
            {"see": this.getSeeRating()}, 
            {"raise": this.getRaiseRating()},
            {"fold": this.getFoldRating()}
        ]
        
        let max = 0;
        let outputCommand = "fold";

        for (let i = 0; i < ratings.length; i++){
            let obj = ratings[i];
            for (let key in obj){
                let command = key;
                let rating = obj[key];

                if (rating > max) {
                    max = rating;
                    outputCommand = key;
                }
            }
        }

        return outputCommand;
    }

    private getSeeRating(): number {  
        let rating = 0;

        switch (this.myInfo.getHandType()) {
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

        switch (this.myInfo.getHandType()) {
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

        switch (this.myInfo.getHandType()) {
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

    private getDiscardRating(): number {
        if (this.gameInfo.getRoundNumber() != 1) {
            return 0;
        }

        let rating = 0;

        if (this.myInfo.getHandType() < 7) {
            rating = 11;
        }

        return rating;
    }

    private getShowRating(): number {
        if (this.gameInfo.getRoundNumber() == 1) {
            return 0;
        }

        let rating = 0;

        if (this.myInfo.getHandType() > 7) {
            rating = 10;
        }

        return rating;
    }
}