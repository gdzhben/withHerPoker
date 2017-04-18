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

    describe('addValue', () => {
        it('should add and return the added value without changing original chip', () => {
            let a = new PokerChip(testValue);
            let b = new PokerChip(testValue);

            let newAddedValue = a.add(b);

            expect(a.getValue()).toBe(testValue);
            expect(b.getValue()).toBe(testValue);
            expect(newAddedValue.getValue()).toBe(testValue + testValue);
        });
    });

    describe('subtract', () => {
        it('should subtract and return the added value without changing original chip', () => {
            let a = new PokerChip(testValue);
            let b = new PokerChip(testValue);

            let newAddedValue = a.subtract(b);

            expect(a.getValue()).toBe(testValue);
            expect(b.getValue()).toBe(testValue);
            expect(newAddedValue.getValue()).toBe(testValue - testValue);
        });
    });
});