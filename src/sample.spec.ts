import { Sample } from "./sample";

describe('Test', () => {

    let test: Sample;

    beforeEach(() => {
        test = new Sample();
    });

    describe('testing the foo method', () => {

        it('it must return hello', () => {
            let result = test.foo();

            expect(result).toBe('hello');
        });
    });
});