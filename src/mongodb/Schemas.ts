import { Schema } from 'mongoose';
import { IGameData } from './IGameData';

export const gameDataSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: true
    },
    startChips:{
        type: Schema.Types.Number,
        required: true
    },
    endChips: {
        type: Schema.Types.Number,
        required: true
    },
    startTime: {
        type: Schema.Types.Date,
        required: true
    },
    endTime: {
        type: Schema.Types.Date,
        required: true
    },
    numberOfRounds: {
        type: Schema.Types.Number,
        required: true
    },
    endState: {
        type: Schema.Types.String,
        required: true
    },
});