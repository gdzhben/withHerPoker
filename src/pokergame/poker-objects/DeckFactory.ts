import * as _ from 'lodash';

import { ICard, SuitType } from '../../interfaces';
import { Card } from './Card';

export class DeckFactory {

	public static createStandardCards(): ICard[] {
		let deckOfCards: ICard[] = [];
		let faceValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
		let suits = [SuitType.Clubs, SuitType.Diamonds, SuitType.Hearts, SuitType.Spades];

		_.times(faceValue.length, (i) => {
			_.forEach(suits, (suit) => {
				deckOfCards.push(new Card(suit, faceValue[i]));
			});
		});

		return deckOfCards;
	}
}