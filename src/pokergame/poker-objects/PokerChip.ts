import { IPokerChip } from '../../interfaces';

export class PokerChip implements IPokerChip {

    private _value: number


    constructor(value: number = 0) {
        this._value = value;
    }

    public getValue(): number {
        return this._value;
    }

    public add(chip: IPokerChip): IPokerChip {
        return new PokerChip(this._value + chip.getValue());
    }

    public subtract(chip: IPokerChip): IPokerChip {
        return new PokerChip(this._value - chip.getValue());
    }
}