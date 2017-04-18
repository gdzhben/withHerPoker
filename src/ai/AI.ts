import { IAI } from './IAI';

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

    // Bet should be in proportion with hand rank.
    // bet = (hand rank / 10) * totalChips.
    // e.g. HighHand: (0 / 10) * totalChips = 0.
    private betAmount(): number {
        let bet = this.myInfo.getHandType() * this.myInfo.totalChips();

        return bet;
    }

    // Return string corresponding to command with highest rating.
    public getCommand(): string {
        let ratings = [
            {"see": this.getSeeRating()}, 
            {"raise": this.getRaiseRating()},
            {"fold": this.getFoldRating()},
            {"discard": this.getDiscardRating()},
            {"show": this.getShowRating()}
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
        let rating = this.riskAversion - this.bluffAbility;

        return rating;
    }

    private getRaiseRating(): number {
        let rating = this.bluffAbility - this.riskAversion;

        return rating;
    }

    private getFoldRating(): number {
        let rating = this.riskAversion - this.bluffAbility;

        return rating;
    }

    private getDiscardRating(): number {
        if (this.gameInfo.getRoundNumber() == 1) {
            return 0;
        }

        let rating = 0;

        let bluffAbility = this.bluffAbility;
        let riskAversion = this.riskAversion;

        if (this.myInfo.getHandType() > 8) {
            rating = this.bluffAbility - this.riskAversion;
        } else if (this.myInfo.getHandType() < 4) {
            rating = this.riskAversion - this.bluffAbility;
        }

        return rating;
    }

    private getShowRating(): number {
        if (this.gameInfo.getRoundNumber() == 1) {
            return 0;
        }

        let rating = 0;

        let bluffAbility = this.bluffAbility;
        let riskAversion = this.riskAversion;

        if (this.myInfo.getHandType() > 8) {
            rating = this.bluffAbility - this.riskAversion;
        } else if (this.myInfo.getHandType() < 4) {
            rating = this.riskAversion - this.bluffAbility;
        }

        return rating;
    }

}