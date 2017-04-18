import { CommandType } from './types';

export interface ICommand {
    getCommandType(): CommandType;
    getArgument(): number;
}

export interface ICommandParser {
    parseToObject(commandString: string): ICommand;
    parseToString(commandObject: ICommand): string;
}