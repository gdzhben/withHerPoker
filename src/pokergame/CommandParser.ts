import { ICommandParser } from './ICommandParser';
import { Command } from './Command';
import { CommandType } from '../types/CommandType';

export class CommandParser implements ICommandParser {
    private readonly commands = {
        'See': CommandType.See, 'Fold': CommandType.Fold, 'Raise': CommandType.Raise,
        'Show': CommandType.Show, 'Discard': CommandType.Discard
    };

    public parseToObject(commandString: string) {
        let tokens = commandString.split(' ');

        let command = tokens[0];
        let argument = tokens[1];

        if (!(command in CommandType)) {
            throw new Error(command + " is not a valid command.");
        }
        if (Number(argument) === NaN) {
            throw new Error(argument + " is not a valid argument.");
        }

        let newCommand = new Command(this.commands[command], Number.parseInt(argument));
        return newCommand;
    }

    public parseToString(commandObject: Command) {
        return commandObject.toString();
    }
}