import * as mongoose from 'mongoose';
import { IGameData } from './IGameData';

export interface GameDataModel extends IGameData, mongoose.Document {

}