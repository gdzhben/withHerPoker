import { IPokerChip } from './IPokerChip';
import { ICard } from './ICard';

export class PokerChip implements IPokerChip {

    private _value: number


    constructor(value: number) {
        this._value = value;
    }

    public getValue(): number {
        return this._value;
    }
}