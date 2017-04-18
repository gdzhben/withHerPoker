import { ICommand } from './ICommand';
import { CommandType } from '../interfaces';

export class Command implements ICommand {

    private _commandType: CommandType;
    private _argument: number;

    constructor(command: CommandType, argument: number) {
        this._commandType = command;
        this._argument = argument;
    }

    public getCommandType(): CommandType {
        // TODO check if null;
        return this._commandType;
    }

    public getArgument(): number {
        return this._argument;
    }

    public toString(): string {
        return CommandType[this._commandType] + ' ' + this._argument;
    }
}