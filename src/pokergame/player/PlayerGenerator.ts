import * as _ from 'lodash';
import * as rx from 'rxjs/Rx';

import {
    IPlayer, IUserMessage, ITwitterBot
} from '../../interfaces';
import { HumanPlayer } from './HumanPlayer';
import { AI } from './AI';

export class PlayerGenerator {

    public static createHumanPlayer(name: string, tools: any): IPlayer {
        return new HumanPlayer(name, tools);
    }

    public static createAIPlayer(name: string): IPlayer {
        return new AI(name, (Math.random() * 9) + 1, (Math.random() * 9) + 1);
    }
}