"use strict";
var sample_1 = require("./sample");
describe('Test', function () {
    var test;
    beforeEach(function () {
        test = new sample_1.Sample();
    });
    describe('testing the foo method', function () {
        it('it must return hello', function () {
            var result = test.foo();
            expect(result).toBe('hello');
        });
    });
});
//# sourceMappingURL=sample.spec.js.map