import { Dealer } from '../pokergame/Dealer';

export interface IAI {
    yourTurn(dealer: Dealer): void;
}