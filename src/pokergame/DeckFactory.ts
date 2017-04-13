import { SuitType } from '../types/SuitType';
import { Card } from '../pokergame/Card';
import { ICard } from './ICard';

export class DeckFactory {

	public static createStandardCards(): ICard[] {
		let deckOfCards: ICard[] = [];
		let faceValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
		let suits = [SuitType.CLUBS, SuitType.DIAMONDS, SuitType.HEARTS, SuitType.SPADES];

		for (let i = 0; i < faceValue.length; i++) {
			for (let suit of suits) {
				deckOfCards.push(new Card(suit, faceValue[i]));
			}
		}

		return deckOfCards;
	}

}