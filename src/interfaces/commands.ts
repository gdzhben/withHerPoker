import { BettingType } from './types';

export interface ICommand {
    getCommandType(): BettingType;
    getArgument(): number;
}

export interface ICommandParser {
    parseToObject(commandString: string): ICommand;
    parseToString(commandObject: ICommand): string;
}