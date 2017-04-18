import { CommandType } from '../interfaces';

export interface ICommand {
    getCommandType(): CommandType;
    getArgument(): number;
}