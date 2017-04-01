import { Sample } from "./sample";

describe('Test', function () {

    var test: Sample;

    beforeEach(function () {
        test = new Sample();
    });

    describe('testing the foo method', function () {

        it('it must return hello', function () {
            var result = test.foo();

            expect(result).toBe('hello');
        });
    });
});