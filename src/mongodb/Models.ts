import * as mongoose from 'mongoose';

import { IGameData } from '../interfaces';

export interface GameDataModel extends IGameData, mongoose.Document {

}