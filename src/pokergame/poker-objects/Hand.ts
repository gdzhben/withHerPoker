import * as _ from 'lodash';

import {
    IHand, ICard, SIZE_OF_HANDS, HandType
} from '../../interfaces';
import { HandTool } from './HandTool';

export class Hand implements IHand {
    private _cards: ICard[];
    private _discardedCount: number;

    constructor(cards: ICard[], private handTool: HandTool) {
        if (_.size(cards) != SIZE_OF_HANDS)
            throw new Error("Expected array of size " + SIZE_OF_HANDS);

        this._cards = [];
        this._discardedCount = 0;

        _.forEach(cards, (card) => {
            this._cards.push(card);
        });
        _.size(this._cards)
        this.sort();
    }

    public discardAndReceive(discardCard: number | ICard, newCard: ICard): ICard {
        let index = -1;
        if (_.isNumber(discardCard)) {
            if (discardCard < 0 || discardCard >= _.size(this._cards)) {
                throw new Error("Index out of bounds.");
            }
            index = discardCard;
        } else {
            let index = _.findIndex(this._cards, (card) => {
                return card.equals(discardCard);
            });
        }
        if (this._discardedCount >= 3) {
            throw new Error("A maximum of 3 cards can be discarded.");
        }
        if (index == -1) {
            throw new Error('Card doesnt exist in the hand.');
        }

        let temp = this._cards[index];
        this._cards[index] = newCard;
        this._discardedCount++;
        this.sort();
        return temp;
    }

    public sort(): void {
        this._cards = this.handTool.sort(this._cards);
    }

    public getCard(index: number): ICard {
        if (index < 0 || index >= _.size(this._cards))
            throw new Error("Index out of range.");

        return this._cards[index];
    }

    public cards(): ICard[] {
        let cards: ICard[] = [];
        _.forEach(this._cards, (card) => {
            cards.push(card);
        });
        return cards;
    }

    public size(): number {
        return _.size(this._cards);
    }

    public getDiscardedCount(): number {
        return this._discardedCount;
    }

    public toString(): string {
        let mapped = _.map(this._cards, (elem) => {
            return elem.toString();
        });
        return _.join(mapped, ', ');
    }

    public getHandType(): HandType {
        return this.handTool.getHandType(this);
    }

    public getGameValue(): number {
        return this.handTool.getGameValue(this);
    }
}