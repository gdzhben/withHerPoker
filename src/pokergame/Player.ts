import { ICommand } from './ICommand';
import { IPlayer } from './IPlayer';

export class Player implements IPlayer {

    private _playerName: string;
    private _command: ICommand;


    constructor(playerName: string) {
        this._playerName = playerName;
    }

    public getPlayerName(): string {
        return this._playerName;
    }
    public getCommand(): ICommand {
        return this._command;
    }



}