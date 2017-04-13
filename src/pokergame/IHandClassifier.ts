import { HandType } from '../types/HandType';

export interface IHandClassifier {
    getTypeOfHand(): HandType;
}