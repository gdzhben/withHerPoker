import { CommandType } from '../types/CommandType';

export interface ICommand {
    getCommandType(): CommandType;
    getArgument(): number;
}