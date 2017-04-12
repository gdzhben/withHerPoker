import { HandType } from '../types/HandType';
import { Hand } from './Hand';

export interface IHandClassifier {

    getHandType(): HandType;

    updateCards(hand: Hand): void;

}