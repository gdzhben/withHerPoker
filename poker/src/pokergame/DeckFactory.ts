import { SuitType } from '../types/SuitType';
import { Card } from '../pokergame/Card';
import { ICard } from './ICard';

export class DeckFactory {

	public static createStandardCards():ICard[] {
		let deckOfCards:ICard[] = [];
		let types: string[] = ["A", "K", "Q", "J", "10", "9", "8", "7", "6", "5", "4", "3", "2"];
		let faceValue:number[]=[1,2,3,4,5,6,7,8,9,10,11,12,13,14];
		let suits: SuitType[] = [SuitType.CLUBS, SuitType.DIAMONDS, SuitType.HEARTS, SuitType.SPADES];
		let sizeOfHand: number = 52;
		let i:number=0;
		let j:number=0;
		
		for (let i = 0, j = 0; i < sizeOfHand; j = (j + 1) % 13) {
			for (let suit of suits) {
				deckOfCards.push(new Card(types[j], suit, faceValue[j]));
			}
		}
		return deckOfCards;
	}

}