import { Command } from './Command';

export interface ICommandParser {
    parseToObject(commandString: string): Command;
    parseToString(commandObject: Command): string;
}