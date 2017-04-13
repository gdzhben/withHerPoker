import { ICommand } from './ICommand';

export interface IPlayer {
    getName(): String;
    getChipCount(): number;
    setCommand(command: ICommand): void;
    getCommand(): ICommand;
}