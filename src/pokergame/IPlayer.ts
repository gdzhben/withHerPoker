import { ICommand } from './ICommand';
export interface IPlayer {
    getPlayerName(): string;
    getCommand(): ICommand;
}