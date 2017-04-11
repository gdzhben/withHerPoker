import { PokerChip } from "./PokerChip";

describe('PokerChip', () => {

    let test: PokerChip;
    let testValue: number = 500;
    beforeEach(() => {

    });

    describe('getValue', () => {
        it('The value should be 500', () => {
            test = new PokerChip(testValue);
            let result = test.getValue();
            expect(result).toBe(500);
        });
    });

});