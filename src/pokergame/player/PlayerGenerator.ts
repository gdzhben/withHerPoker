import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';

import {
    IPlayer, IUserMessage, ITwitterBot
} from '../../interfaces';
import { HumanPlayer } from './HumanPlayer';
import { StupidPlayer } from './StupidPlayer';

export class PlayerGenerator {

    public static createHumanPlayer(name: string, tools: any): IPlayer {
        return new HumanPlayer(name, tools);
    }

    public static createStupidPlayer(name: string): IPlayer {
        return new StupidPlayer(name);
    }
}