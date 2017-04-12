
import { ICommand } from './ICommand';

export class Command implements ICommand {

    private _command: string


    constructor(command: string) {
        this._command = command;
    }

    public getCommand(): string {
        return this._command;
    }

}