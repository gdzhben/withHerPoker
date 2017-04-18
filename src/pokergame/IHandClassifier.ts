import { HandType } from '../interfaces';

export interface IHandClassifier {
    getTypeOfHand(): HandType;
}