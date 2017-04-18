import { IAI } from './IAI';

export class AI implements IAI {
    private bluffAbility: number;
    private riskAversion: number;
    private composure: number;
    private cardCounting: number;
    private gameInfo: any;
    private myInfo: any;

    constructor(gameInfo: any, myInfo: any) {
        this.bluffAbility = Math.floor((Math.random() * 10) + 1);
        this.riskAversion = Math.floor((Math.random() * 10) + 1);
        this.composure = Math.floor((Math.random() * 10) + 1);
        this.cardCounting = Math.floor((Math.random() * 10) + 1);
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
        let bet = this.myInfo.handType() * this.myInfo.totalChips();

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

        return 0;
    }

    private getRaiseRating(): number {

        return 0;
    }

    private getFoldRating(): number {

        return 0;
    }

    private getDiscardRating(): number {

        return 0;
    }

    private getShowRating(): number {

        return 0;
    }


}