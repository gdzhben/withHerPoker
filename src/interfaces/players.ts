import { ICommand } from './commands';

export interface IPlayer {
    getName(): string;
    yourTurn(dealer: any): void;
}